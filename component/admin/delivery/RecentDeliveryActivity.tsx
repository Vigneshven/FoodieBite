import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Bike,
  Package,
  PackageCheck,
  XCircle,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Order delivered successfully",
    description: "Order #OR-1 was delivered to test1",
    time: "2 minutes ago",
    icon: PackageCheck,
    status: "Delivered",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 2,
    title: "Delivery partner assigned",
    description: "test2 was assignes to order #OR-2",
    time: "8 minutes ago",
    status: "Assigned",
    icon: Bike,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Order Picked up",
    description: "test3 picked up order #OR-3",
    time: "15 minutes ago",
    status: "Picked Up",
    icon: Package,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 4,
    title: "Delivery delayed",
    description: "Order #OR-4 is delayed due to rain",
    time: "30 minutes ago",
    status: "Delayed",
    icon: AlertTriangle,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    title: "Delivery cancelled",
    description: "Order #OR-5 was cancelled by customer",
    time: "30 minutes ago",
    status: "Cancelled",
    icon: XCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-100",
  },
];

export default function RecentDeliveryActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Delivery Activity</CardTitle>
        <CardDescription>
          Latest updates from your delivery operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${activity.bgColor}`}
                  >
                    <Icon className={`size-4 ${activity.iconColor}`} />
                  </div>
                  {index !== activities.length - 1 && (
                    <div className="mt-2 h-full w-px bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <span className="font-bold text-xs text-muted-foreground ">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground font-bold">{activity.description}</p>
                  <Badge variant="outline" className="mt-2">{activity.status}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
