import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Bike,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
} from "lucide-react";

const statusConfig = {
  Pending: {
    icon: Clock3,
    color: "text-amber-600",
    badge: "bg-amber-500 text-amber-600 border-amber-500",
    description: "Waiting for restaurant confirmation",
  },
  Confirmed: {
    icon: CheckCircle2,
    color: "text-blue-600",
    badge: "bg-blue-500 text-blue-600 border-blue-500",
    description: "Restaurant has confirmed the order",
  },
  Preparing: {
    icon: Package,
    color: "text-blue-600",
    badge: "bg-blue-500 text-blue-600 border-blue-500",
    description: "Restaurant is preparing your order",
  },
  "Picked Up": {
    icon: Bike,
    color: "text-blue-600",
    badge: "bg-blue-500 text-blue-600 border-blue-500",
    description: "Waiting for restaurant confirmation",
  },
  "Out for Delivery": {
    icon: Clock3,
    color: "text-amber-600",
    badge: "bg-amber-500 text-amber-600 border-amber-500",
    description: "Delivery Partner is heading to the customer",
  },
  Delivered: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    badge: "bg-emerald-500 text-emerald-600 border-emerald-500",
    description: "Order successfully delivered",
  },
  Delayed: {
    icon: AlertCircle,
    color: "text-red-600",
    badge: "bg-red-500 text-red-600 border-red-500",
    description: "Delivery is taking longer than expected",
  },
};

export type TrackingStatusType = keyof typeof statusConfig;

export type TrackingStatusProps = {
  status: TrackingStatusType;
  estimatedArrival: string;
  lastUpdated: string;
  progress: number;
};

export default function TrackingStatus({
  status,
  estimatedArrival,
  lastUpdated,
  progress,
}: TrackingStatusProps) {
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;
  return (
    <Card className="h-full border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-7">
          <CardTitle className="text-lg font-bold">Delivery Status</CardTitle>
          <Badge variant="outline" className={` ${currentStatus.badge}`}>
            <StatusIcon className="mr-1 h-3 w-3" />
            <p className="text-white font-bold text-xs">{status}</p>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex flex-col gap-10 mt-10">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl bg-muted p-3 ${currentStatus.color}`}>
            <StatusIcon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold">{status}</p>
            <p className="text-sm text-muted-foreground font-bold">
              {currentStatus.description}
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-muted p-4">
          <div className="flex items-center gap-2 text-muted-foreground font-bold">
            <Clock3 className="h-4 w-4" />
            <span className="text-sm">Estimated Arrival</span>
          </div>
          <p className="text-2xl mt-2 font-bold">{estimatedArrival}</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Delivery Progess</span>
            <span className="text-sm font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground font-bold">
            <span>Order Placed</span>
            <span>Delivered</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-muted-foreground font-bold">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">Last Update</span>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              {lastUpdated}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
