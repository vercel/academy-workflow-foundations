import { FatalError } from "workflow";
import { resend, FROM } from "@/lib/resend";
import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function sendOrderConfirmation(order: Order): Promise<void> {
  "use step";

  const resp = await resend.emails.send({
    from: FROM,
    to: [order.email],
    subject: `Order confirmed: ${order.size} ${order.pizza}`,
    html: `
      <p>Hi ${order.customerName},</p>
      <p>We got your order for a ${order.size} ${order.pizza} on ${order.crust} crust.</p>
      <p>We'll let you know when it's out for delivery to ${order.address}.</p>
      <p>Sal</p>
    `,
  });

  if (resp.error) {
    throw new FatalError(`Resend failed: ${resp.error.message}`);
  }

  updateStatus(order.id, "confirmed");
}
