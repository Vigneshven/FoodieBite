import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Package,
  Pencil,
  Truck,
} from "lucide-react";
import Link from "next/link";

type DeliveryOverviewProps = {
  orderId: string;
};

export default function DeliveryOverview({ orderId }: DeliveryOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Link
            href="/admin/delivery"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Delivery
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Delivery Details
            </h1>
            <p className="text-sm text-muted-foreground font-bold">
              Manage and review delivery information
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Link href={`/admin/delivery/${orderId}/track`}></Link>
            <MapPin className="mr-2 size-4" />
            Track Delivery
          </Button>
          <Button>
            <Link href={`/admin/delivery/${orderId}/edit`}></Link>
            <Pencil className="mr-2 size-4" />
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex size-11 items-center-safe justify-center rounded-xl bg-muted text-muted-foreground font-bold">
                <Package className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-bold">
                  Order ID
                </p>
                <h2 className="text-xl font-bold">{orderId}</h2>
              </div>
              <Badge className="bg-green-100 text-green-600 hover:bg-green">
                Delivered
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-bold">
              Delivery completed successfully
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex size-9 items-center-safe justify-center rounded-lg bg-muted">
                <CalendarDays className="size-4 text-muted-foreground font-bold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-bold">
                  Order Date
                </p>
                <p className="text-sm font-medium">Nov 05,2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Truck className="size-4 text-muted-foreground font-bold" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Delivery Time</p>
                <p className="text-sm font-medium">32 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
