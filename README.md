# Pizza Tracker — Complete

The reference implementation for the **Workflow Foundations** course.

```bash
pnpm install
cp .env.local.example .env.local   # add your RESEND_API_KEY
pnpm dev
```

In another terminal:

```bash
pnpm workflow:web   # local dashboard at http://localhost:3700
```

Then open http://localhost:3000 and place a pizza order.

## Pages

- `/` — Customer order form
- `/orders/[runId]` — Order status page (polls workflow state)
- `/kitchen` — Kitchen ops (mark orders as ready)
- `/driver` — Driver ops (pickup + delivered)

## Workflow Steps

1. `chargeCard` — Fake payment, throws `FatalError` if the last 4 ends in `0000`
2. `sendOrderConfirmation` — Resend email
3. `acknowledgeKitchen` — Flaky (throws ~30% to demo retries)
4. Wait on `kitchen:{orderId}` hook (with 20-minute timeout)
5. `dispatchDelivery` — Driver assignment
6. Wait on `driver-pickup:{orderId}` hook
7. Wait on `driver-delivered:{orderId}` hook
8. `sendReviewRequest` — Resend email
