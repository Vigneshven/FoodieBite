import DeliveryMap from "@/component/admin/delivery/tracking/DeliveryMap";
import DeliveryProgress from "@/component/admin/delivery/tracking/DeliveryProgress";
import RiderInformation from "@/component/admin/delivery/tracking/RiderInformation";
import TrackingStatus from "@/component/admin/delivery/tracking/TrackingStatus";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const rider = {
  id: "RD-1",
  name: "test3",
  email: "test3@gmail.com",
  phone: "+91 12345 67894",
  vehicle: "Motorcycle",
  vehicleNo: "TN23 BA1366",
  rating: 4.8,
  totalDeliveries: 34,
  joinedDate: "Nov 06,2026",
  status: "On Delivery" as const,
};

export default function TrackDeliveryPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Track Delivery</h1>
        <p className="text-sm text-muted-foreground font-bold">
          Monitor the delivery route and estimated arrival
        </p>
      </div>
      <div>
        <div>
          <Link
            href="/admin/delivery"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Delivery
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="min-w-0 xl:col-span-2 space-y-2">
          <DeliveryMap
            restaurantName="Pizza Palace"
            customerName="Test1"
            distance="5 km"
            estimatedArrival="10 min"
          />
        </div>
        <div className="min-w-0">
          <TrackingStatus
            status="Out for Delivery"
            estimatedArrival="12 min"
            lastUpdated="Just Now"
            progress={75}
          />
        </div>
        <div>
          <RiderInformation rider={rider} />
        </div>
      </div>
      <div>
        <DeliveryProgress
          status="Picked Up"
          lastUpdated="Nov 06, 2026 at 01:30 PM"
        />
      </div>
    </div>
  );
}
