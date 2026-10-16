import { FatalError } from "workflow";
import { resend, FROM } from "@/lib/resend";
import { updateStatus } from "@/lib/orders-store";
import type { Order } from "@/lib/pizza";

export async function sendReviewRequest(order: Order): Promise<void> {
  "use step";

  const resp = await resend.emails.send({
    from: FROM,
    to: [order.email],
    subject: `How was your ${order.pizza}?`,
    html: `
      <p>Hi ${order.customerName},</p>
      <p>Your pizza has landed. Hit reply and tell us how it was.</p>
      <p>Sal</p>
    `,
  });

  if (resp.error) {
    throw new FatalError(`Resend failed: ${resp.error.message}`);
  }

  updateStatus(order.id, "review-sent");
}
