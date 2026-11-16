import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, CheckCircle2, Package, Wallet } from "lucide-react";

const deliveryStats = [
  {
    title: "Total Deliveries",
    value: "12",
    description: "Today's assignments",
    icon: Package,
  },
  {
    title: "Completed Deliveries",
    value: "8",
    description: "Successfully delivered",
    icon: CheckCircle2,
  },
  {
    title: "Active Orders",
    value: "2",
    description: "Currently in progress",
    icon: Bike,
  },
  {
    title: "Today's Earnings",
    value: "₹850",
    description: "Earned today",
    icon: Wallet,
  },
];

export default function DeliveryStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {deliveryStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex  items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <Icon className="size-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
