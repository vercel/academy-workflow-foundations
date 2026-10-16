import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function acknowledgeKitchen(order: Order): Promise<void> {
  "use step";

  if (Math.random() < 0.3) {
    throw new Error("Kitchen printer jammed. Retrying.");
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  updateStatus(order.id, "in-the-kitchen");
}

acknowledgeKitchen.maxRetries = 5;
