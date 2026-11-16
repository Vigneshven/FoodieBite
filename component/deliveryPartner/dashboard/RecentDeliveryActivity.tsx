import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, MapPin, Store, Wallet } from "lucide-react";
import Link from "next/link";

const recentDeliveries = [
  {
    id: "ORD-1",
    restaurant: "A2B",
    customerAddress: "katpadi,vellore",
    completedAt: "Today, 11:45 AM",
    earnings: 65,
  },
  {
    id: "ORD-2",
    restaurant: "Thambi Biriyani",
    customerAddress: "Bayagam,vellore",
    completedAt: "Today, 10:30 AM",
    earnings: 50,
  },
];

export default function RecentDeliveryActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Recent Delivery Activity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your latest completed deliveries.
          </p>
        </div>

        <Button variant="outline" size="sm">
          <Link href="/delivery/history">
            View All
            <ArrowRight className="ml-2 size-4 inline-flex" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentDeliveries.map((delivery, index) => (
          <div key={delivery.id}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <CheckCircle2 className="size-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{delivery.id}</p>
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700"
                    >
                      Delivered
                    </Badge>
                  </div>
                  <p className="flex items-center gap-2 text-sm">
                    <Store className="size-3 text-muted-foreground" />
                    {delivery.restaurant}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="size-3 shrink-0" />
                    {delivery.customerAddress}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {delivery.completedAt}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <div className="flex items-center gap-1 font-semibold">
                  <Wallet className="size-4 text-green-600" />₹
                  {delivery.earnings}
                </div>
                <p className="text-xs text-muted-foreground">
                  Delivery earnings
                </p>
              </div>
            </div>
            {index !== recentDeliveries.length - 1 && (
              <Separator className="mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
