import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function confirmDelivery(order: Order): Promise<void> {
  "use step";

  updateStatus(order.id, "delivered");
}
