"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MENU, type PizzaName, type Size, type Crust } from "@/lib/pizza";

export default function OrderPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const body = {
      customerName: String(form.get("customerName") ?? ""),
      email: String(form.get("email") ?? ""),
      pizza: String(form.get("pizza")) as PizzaName,
      size: String(form.get("size")) as Size,
      crust: String(form.get("crust")) as Crust,
      address: String(form.get("address") ?? ""),
      cardLast4: String(form.get("cardLast4") ?? ""),
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      setError("Couldn't place your order. Try again.");
      setSubmitting(false);
      return;
    }

    const { runId } = (await res.json()) as { runId: string };
    router.push(`/orders/${runId}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Order a pizza</h1>
      <p className="mt-2 text-stone-600">
        Marge Pepperoni and Sal Mozzarella both recommend the Carbonara.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <Field label="Your name">
          <input
            name="customerName"
            required
            defaultValue="Marge Pepperoni"
            className={inputCls}
          />
        </Field>

        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            placeholder="marge@example.com"
            className={inputCls}
          />
        </Field>

        <Field label="Pizza">
          <select name="pizza" required defaultValue="Sal's Special" className={inputCls}>
            {MENU.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} (${p.price})
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Size">
            <select name="size" defaultValue="large" className={inputCls}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </Field>
          <Field label="Crust">
            <select name="crust" defaultValue="thin" className={inputCls}>
              <option value="thin">Thin</option>
              <option value="thick">Thick</option>
            </select>
          </Field>
        </div>

        <Field label="Delivery address">
          <input
            name="address"
            required
            defaultValue="123 Sourdough Lane"
            className={inputCls}
          />
        </Field>

        <Field label="Card last 4 (use 0000 to simulate decline)">
          <input
            name="cardLast4"
            required
            defaultValue="4242"
            maxLength={4}
            pattern="[0-9]{4}"
            className={inputCls}
          />
        </Field>

        {error && (
          <p className="text-sm" style={{ color: "var(--pizza-red)" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md px-5 py-3 text-white font-semibold disabled:opacity-60"
          style={{ background: "var(--pizza-red)" }}
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "rounded-md border border-stone-300 bg-white px-3 py-2 text-base font-normal focus:outline-none focus:ring-2 focus:ring-red-500";
