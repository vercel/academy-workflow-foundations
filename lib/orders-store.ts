import type { Order, OrderStatus } from "./pizza";

type StoredOrder = {
  order: Order;
  runId: string;
  status: OrderStatus;
  updatedAt: string;
};

const store = new Map<string, StoredOrder>();

export function recordOrder(order: Order, runId: string): void {
  store.set(order.id, {
    order,
    runId,
    status: "placed",
    updatedAt: new Date().toISOString(),
  });
}

export function updateStatus(orderId: string, status: OrderStatus): void {
  const existing = store.get(orderId);
  if (!existing) return;
  store.set(orderId, {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  });
}

export function getOrderByRunId(runId: string): StoredOrder | undefined {
  for (const entry of store.values()) {
    if (entry.runId === runId) return entry;
  }
  return undefined;
}

export function listOrdersByStatus(status: OrderStatus): StoredOrder[] {
  return Array.from(store.values())
    .filter((entry) => entry.status === status)
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
}
