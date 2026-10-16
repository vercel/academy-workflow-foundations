import { FatalError } from "workflow";
import { resend, FROM } from "@/lib/resend";
import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function sendEscalationEmail(order: Order): Promise<void> {
  "use step";

  const resp = await resend.emails.send({
    from: FROM,
    to: [order.email],
    subject: "We're checking on your order",
    html: `
      <p>Hi ${order.customerName},</p>
      <p>Your ${order.pizza} is taking longer than usual. We're calling the kitchen now.</p>
      <p>Sal</p>
    `,
  });

  if (resp.error) {
    throw new FatalError(`Resend failed: ${resp.error.message}`);
  }

  updateStatus(order.id, "escalated");
}
