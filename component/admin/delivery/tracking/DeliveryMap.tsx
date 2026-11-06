import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MapWrapper from "./MapWrapper";
import { Bike, Clock3, Navigation, Route } from "lucide-react";

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
        <div className="relative z-0 h-87.5 w-full overflow-hidden rounded-xl border">
          <MapWrapper />
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-muted-foreground font-bold">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-600" />
            Restaurant
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            Delivery Partner
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-5 rounded-full bg-blue-600" />
            Sample Route
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2 text-muted-foreground font-bold">
              <Route className="h-4 w-4" />
              <span className="text-xs">Distance</span>
            </div>
            <p className="mt-2 text-xl font-semibold">{distance}</p>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2 text-muted-foreground font-bold">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs">Estimated Arrival</span>
            </div>
            <p className="mt-2 text-xl font-semibold">{estimatedArrival}</p>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2 text-muted-foreground font-bold">
              <Navigation className="h-4 w-4" />
              <span className="text-xs">Delivery Destination</span>
            </div>
            <p className="mt-2 text-xl font-bold flex items-center gap-2">
              From {restaurantName}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-muted text-xs text-muted-foreground font-bold ">
          <Bike className="w-4 h-4" />
          <p className="flex items-center">
            Rider will be arrived shortly to deliver food to customer{" "}
            {customerName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
