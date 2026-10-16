import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function markOutForDelivery(order: Order): Promise<void> {
  "use step";

  updateStatus(order.id, "out-for-delivery");
}
