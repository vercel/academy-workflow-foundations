import { FatalError } from "workflow";
import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function chargeCard(order: Order): Promise<{ chargedAt: string }> {
  "use step";

  if (order.cardLast4 === "0000") {
    throw new FatalError(`Card declined for order ${order.id}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  updateStatus(order.id, "charged");
  return { chargedAt: new Date().toISOString() };
}
