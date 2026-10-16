# Pizza Tracker — Starter

Starter for the **Workflow Foundations** course.

```bash
pnpm install
cp .env.local.example .env.local   # add your RESEND_API_KEY
pnpm dev
```

Then open http://localhost:3000.

## What's already here

- The customer order form (`app/page.tsx`)
- Kitchen and driver ops pages (buttons will 404 until you wire up the API routes in Section 3)
- The order status page (`app/orders/[runId]/page.tsx`)
- A stub `/api/orders` route that stores the order locally and returns a fake run ID

## What you'll build

- Wrap `next.config.ts` with `withWorkflow` (Lesson 1.1)
- Steps in `workflows/steps/` starting with `sendOrderConfirmation` (Lesson 1.2)
- The `processOrder` workflow (Lesson 1.3)
- API routes to resume hooks (`/api/kitchen/ready`, `/api/driver/pickup`, `/api/driver/delivered`)

Each lesson tells you exactly what to add.
