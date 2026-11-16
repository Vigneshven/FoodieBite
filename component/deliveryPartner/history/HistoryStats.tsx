import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban, CheckCircle2, Wallet, XCircle } from "lucide-react";

const historyStats = [
  {
    title: "Completed Deliveries",
    value: "128",
    description: "Successfully delivered orders",
    icon: CheckCircle2,
    iconStyle: "bg-green-100 text-green-600",
  },
  {
    title: "Rejected Deliveries",
    value: "08",
    description: "Requests you rejected",
    icon: XCircle,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Cancelled Deliveries",
    value: "04",
    description: "Cancelled assignments",
    icon: Ban,
    iconStyle: "bg-red-100 text-red-600",
  },
  {
    title: "Total Earnings",
    value: "₹12,850",
    description: "From completed deliveries",
    icon: Wallet,
    iconStyle: "bg-blue-100 text-blue-600",
  },
];

export default function HistoryStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {historyStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className={`rounded-lg p-2 ${stat.iconStyle}`}>
                <Icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
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
