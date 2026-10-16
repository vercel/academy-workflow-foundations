"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/pizza";

type Item = { order: Order; runId: string; updatedAt: string };

export function DriverList({
  title,
  empty,
  action,
  actionLabel,
  endpoint,
  orders,
}: {
  title: string;
  empty: string;
  action: string;
  actionLabel: string;
  endpoint: string;
  orders: Item[];
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => router.refresh(), 2000);
    return () => clearInterval(id);
  }, [router]);

  async function trigger(orderId: string) {
    setBusyId(orderId);
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    setBusyId(null);
    router.refresh();
  }

  return (
    <section className="mt-8">
      <h2 className="font-semibold text-lg">{title}</h2>
      {orders.length === 0 ? (
        <p className="mt-2 text-sm text-stone-500">{empty}</p>
      ) : (
        <ul className="mt-3 grid gap-3">
          {orders.map(({ order }) => (
            <li
              key={`${action}-${order.id}`}
              className="flex items-center justify-between rounded-lg border border-stone-300 bg-white p-4"
            >
              <div>
                <p className="font-semibold">
                  {order.size} {order.pizza}
                </p>
                <p className="text-sm text-stone-500">
                  {order.customerName} · {order.address}
                </p>
              </div>
              <button
                onClick={() => trigger(order.id)}
                disabled={busyId === order.id}
                className="rounded-md px-4 py-2 text-white font-semibold disabled:opacity-60"
                style={{ background: "var(--pizza-red)" }}
              >
                {busyId === order.id ? "Sending..." : actionLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
