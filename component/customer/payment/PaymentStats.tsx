import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, Clock, RefreshCcw, Wallet } from "lucide-react";

const stats = [
  {
    title: "Total Spents",
    value: "2120",
    icons: Wallet,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    title: "Successful Payments",
    value: "100",
    icons: CircleCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Pending Payments",
    value: "3",
    icons: Clock,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    title: "Refunded Amount",
    value: "100",
    icons: RefreshCcw,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icons;
        return (
          <Card key={stat.title} className="border shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.bg}`}
                >
                  <Icon className={`h-7 w-7 ${stat.color}`} />
                </div>
                <div className="ml-1 flex flex-col w-full items-start gap-2">
                  <h2 className="text-2xl font-bold text-muted-foreground">
                    {stat.value}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
