import { Card, CardContent } from "@/components/ui/card";
import { Bike, CheckCircle2, Clock, Package, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "48",
    description: "All assigned orders",
    icon: Package,
  },
  {
    title: "New Requests",
    value: "05",
    description: "Awaiting your response",
    icon: Clock,
  },
  {
    title: "Active Deliveries",
    value: "02",
    description: "Currently in progress",
    icon: Bike,
  },
  {
    title: "Completed",
    value: "38",
    description: "Successfully delivered",
    icon: CheckCircle2,
  },
  {
    title: "Rejected",
    value: "03",
    description: "Declined assignments",
    icon: XCircle,
  },
];

export default function DeliveryOrderStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-start justify-between gap-3 p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-2">
                <Icon className="size-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
