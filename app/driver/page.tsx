import { listOrdersByStatus } from "@/lib/orders-store";
import { DriverList } from "./list";

export const dynamic = "force-dynamic";

export default function DriverPage() {
  const awaitingPickup = listOrdersByStatus("ready-for-pickup");
  const inFlight = listOrdersByStatus("out-for-delivery");

  return (
    <div>
      <h1 className="text-3xl font-bold">Driver ops</h1>

      <DriverList
        title="Ready for pickup"
        empty="Nothing to grab yet."
        action="pickup"
        actionLabel="Pick up"
        endpoint="/api/driver/pickup"
        orders={awaitingPickup}
      />

      <DriverList
        title="Out for delivery"
        empty="Nothing in transit."
        action="delivered"
        actionLabel="Mark delivered"
        endpoint="/api/driver/delivered"
        orders={inFlight}
      />
    </div>
  );
}
