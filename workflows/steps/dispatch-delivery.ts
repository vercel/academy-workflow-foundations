import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function dispatchDelivery(order: Order): Promise<void> {
  "use step";

  await new Promise((resolve) => setTimeout(resolve, 200));

  updateStatus(order.id, "ready-for-pickup");
}
