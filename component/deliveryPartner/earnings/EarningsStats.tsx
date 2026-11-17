import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock3, IndianRupee, Wallet } from "lucide-react";

const earningsStats = [
  {
    title: "Total Earnings",
    value: "₹24,850",
    description: "From completed deliveries",
    icon: Wallet,
    iconStyle: "bg-blue-100 text-blue-600",
  },
  {
    title: "Today's Earnings",
    value: "₹850",
    description: "12 completed deliveries",
    icon: IndianRupee,
    iconStyle: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Payout",
    value: "₹2,450",
    description: "Awaiting settlement",
    icon: Clock3,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total Paid",
    value: "₹22,400",
    description: "Successfully transferred",
    icon: CheckCircle2,
    iconStyle: "bg-purple-100 text-purple-600",
  },
];

export default function EarningsStats() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {earningsStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>

                <h3 className="text-2xl font-semibold">{stat.value}</h3>

                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div
                className={`flex size-11 items-center justify-center rounded-lg ${stat.iconStyle}`}
              >
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
