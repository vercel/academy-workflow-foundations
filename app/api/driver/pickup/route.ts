import { resumeHook } from "workflow/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { orderId } = (await request.json()) as { orderId: string };

  await resumeHook(`driver-pickup:${orderId}`, {
    pickedUpAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
