import {
  MessageSquare,
  Clock,
  LoaderCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QueryStat = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
};

const queryStats: QueryStat[] = [
  {
    title: "Total Queries",
    value: "248",
    description: "All queries received",
    icon: MessageSquare,
    trend: "+12 this week",
  },
  {
    title: "Pending",
    value: "32",
    description: "Waiting for response",
    icon: Clock,
  },
  {
    title: "In Progress",
    value: "18",
    description: "Currently being handled",
    icon: LoaderCircle,
  },
  {
    title: "Resolved",
    value: "198",
    description: "Successfully resolved",
    icon: CheckCircle2,
    trend: "79.8% resolution rate",
  },
];

export default function QueryStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {queryStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title} className="gap-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>

              <div className="rounded-lg p-2">
                <Icon className="size-4 " />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold tracking-tight">
                {stat.value}
              </div>

              <div className="mt-2 flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>

                {stat.trend && (
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    {stat.title === "Total Queries" && (
                      <TrendingUp className="size-3" />
                    )}
                    {stat.trend}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
