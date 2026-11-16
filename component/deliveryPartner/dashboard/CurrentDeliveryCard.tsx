import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Clock, MapPin, Package, Store } from "lucide-react";
import Link from "next/link";

const delivery = {
  orderId: "ORD-1",
  restaurantName: "A2B",
  pickupAddress: "Katpadi,Vellore",
  customerName: "Viki",
  customerAddress: "Bayagam,vellore",
  distance: "3.5 km",
  estimatedTime: "15 minutes",
  status: "Out for Delivery",
};

export default function CurrentDeliveryCard() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Current Delivery</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your currently active delivery assignment.
          </p>
        </div>

        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          {delivery.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2.5">
              <Package className="size-5" />
            </div>
            <div>
              <p className="font-semibold">{delivery.orderId}</p>
              <p className="text-xs text-muted-foreground">Active delivery</p>
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-semibold">{delivery.distance}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Estimated arrival</p>
              <p className="flex items-center gap-1 text-sm font-semibold">
                <Clock className="size-3" />
                {delivery.estimatedTime}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Store className="size-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                PICKUP FROM
              </p>
              <p className="font-semibold">{delivery.restaurantName}</p>
              <p className="text-sm text-muted-foreground">
                {delivery.pickupAddress}
              </p>
            </div>
          </div>
          <div className="ml-4 h-5 border-l-2 border-dashed" />
          <div className="flex gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <MapPin className="size-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                DELIVER TO
              </p>
              <p className="font-semibold">{delivery.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {delivery.customerAddress}
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline">
            <Link href={`/delivery/orders/${delivery.orderId}`}>
              View Delivery Details
              <ArrowRight className="ml-2 size-4 inline-flex" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
