import { createHook, sleep } from "workflow";
import type { Order } from "@/lib/pizza";
import { chargeCard } from "./steps/charge-card";
import { sendOrderConfirmation } from "./steps/send-order-confirmation";
import { acknowledgeKitchen } from "./steps/acknowledge-kitchen";
import { dispatchDelivery } from "./steps/dispatch-delivery";
import { markOutForDelivery } from "./steps/mark-out-for-delivery";
import { confirmDelivery } from "./steps/confirm-delivery";
import { sendReviewRequest } from "./steps/send-review-request";
import { sendEscalationEmail } from "./steps/send-escalation-email";

const KITCHEN_TIMEOUT = "20m";

export async function processOrder(order: Order): Promise<{
  status: "delivered" | "escalated";
  orderId: string;
}> {
  "use workflow";

  await chargeCard(order);
  await sendOrderConfirmation(order);
  await acknowledgeKitchen(order);

  using kitchenHook = createHook<{ readyAt: string }>({
    token: `kitchen:${order.id}`,
  });

  const kitchenResult = await Promise.race([
    kitchenHook.then((payload) => ({ kind: "ready" as const, payload })),
    sleep(KITCHEN_TIMEOUT).then(() => ({ kind: "timeout" as const })),
  ]);

  if (kitchenResult.kind === "timeout") {
    await sendEscalationEmail(order);
    return { status: "escalated", orderId: order.id };
  }

  await dispatchDelivery(order);

  using pickupHook = createHook<{ pickedUpAt: string }>({
    token: `driver-pickup:${order.id}`,
  });
  await pickupHook;
  await markOutForDelivery(order);

  using deliveryHook = createHook<{ deliveredAt: string }>({
    token: `driver-delivered:${order.id}`,
  });
  await deliveryHook;

  await confirmDelivery(order);
  await sendReviewRequest(order);

  return { status: "delivered", orderId: order.id };
}
