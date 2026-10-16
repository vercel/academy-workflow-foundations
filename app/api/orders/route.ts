import { NextResponse } from "next/server";
import { recordOrder } from "@/lib/orders-store";
import type { Order, PizzaName, Size, Crust } from "@/lib/pizza";

type IncomingOrder = {
  customerName: string;
  email: string;
  pizza: PizzaName;
  size: Size;
  crust: Crust;
  address: string;
  cardLast4: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as IncomingOrder;

  const order: Order = {
    id: crypto.randomUUID(),
    customerName: body.customerName,
    email: body.email,
    pizza: body.pizza,
    size: body.size,
    crust: body.crust,
    address: body.address,
    cardLast4: body.cardLast4,
    placedAt: new Date().toISOString(),
  };

  // TODO (Lesson 1.3): Replace this stub with start(processOrder, [order]).
  // For now we generate a fake runId so the redirect to /orders/[runId] works.
  const fakeRunId = crypto.randomUUID();
  recordOrder(order, fakeRunId);

  return NextResponse.json({ runId: fakeRunId });
}
