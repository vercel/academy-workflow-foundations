import { start } from "workflow/api";
import { NextResponse } from "next/server";
import { processOrder } from "@/workflows/process-order";
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

  const run = await start(processOrder, [order]);
  recordOrder(order, run.runId);

  return NextResponse.json({ runId: run.runId });
}
