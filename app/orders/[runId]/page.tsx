import { getOrderByRunId } from "@/lib/orders-store";
import { STATUS_LABEL } from "@/lib/pizza";
import { notFound } from "next/navigation";
import { OrderStatusRefresher } from "./refresher";

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const entry = getOrderByRunId(runId);

  if (!entry) {
    notFound();
  }

  const { order, status } = entry;

  return (
    <div>
      <OrderStatusRefresher />
      <p className="text-sm text-stone-500">
        Run <code className="font-mono">{runId.slice(0, 8)}…</code>
      </p>
      <h1 className="mt-2 text-3xl font-bold">{STATUS_LABEL[status]}</h1>
      <p className="mt-2 text-stone-600">
        Thanks {order.customerName}. Your {order.size} {order.pizza} ({order.crust} crust) is on its way to {order.address}.
      </p>

      <div className="mt-8 rounded-lg border border-stone-300 bg-white p-6">
        <h2 className="font-semibold">Order details</h2>
        <dl className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-stone-500">Pizza</dt>
          <dd>{order.pizza}</dd>
          <dt className="text-stone-500">Size</dt>
          <dd>{order.size}</dd>
          <dt className="text-stone-500">Crust</dt>
          <dd>{order.crust}</dd>
          <dt className="text-stone-500">Card</dt>
          <dd>•••• {order.cardLast4}</dd>
        </dl>
      </div>

      <p className="mt-6 text-sm text-stone-500">
        Open the workflow dashboard to follow every step.
      </p>
    </div>
  );
}
