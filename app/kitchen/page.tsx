import { listOrdersByStatus } from "@/lib/orders-store";
import { KitchenList } from "./list";

export const dynamic = "force-dynamic";

export default function KitchenPage() {
  const waiting = listOrdersByStatus("in-the-kitchen");

  return (
    <div>
      <h1 className="text-3xl font-bold">Kitchen ops</h1>
      <p className="mt-2 text-stone-600">
        {waiting.length === 0
          ? "No pizzas in the oven. Sal is taking a nap."
          : `${waiting.length} pizza${waiting.length === 1 ? "" : "s"} in the oven.`}
      </p>

      <KitchenList orders={waiting} />
    </div>
  );
}
