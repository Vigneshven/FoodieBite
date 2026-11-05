import DeliveryMap from "@/component/admin/delivery/tracking/DeliveryMap";

export default async function TrackDeliveryPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Track Delivery</h1>
        <p className="text-sm text-muted-foreground font-bold">
          Monitor the delivery route and estimated arrival
        </p>
      </div>
      <DeliveryMap
        restaurantName="Pizza Palace"
        customerName="Test1"
        distance="5 km"
        estimatedArrival="10 min"
      />
    </div>
  );
}
