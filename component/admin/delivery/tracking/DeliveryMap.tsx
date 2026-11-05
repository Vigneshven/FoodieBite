import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MapWrapper from "./MapWrapper";

export type DeliveryMapProps = {
  restaurantName: string;
  customerName: string;
  distance: string;
  estimatedArrival: string;
};

export default function DeliveryMap({
  restaurantName = "Pizza Palace",
  customerName = "Test1",
  distance = "5 km",
  estimatedArrival = "10 min",
}: DeliveryMapProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Live Delivery Map</CardTitle>
          <CardDescription>
            Delivery route and location overview
          </CardDescription>
        </div>
        <div>
          <span>Tracking active</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative z-0 h-87.5 overflow-hidden rounded-xl border">
          <MapWrapper />
        </div>
      </CardContent>
    </Card>
  );
}
