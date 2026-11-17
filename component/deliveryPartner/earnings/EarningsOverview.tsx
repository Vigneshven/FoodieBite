"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const weeklyData = [
  { day: "Mon", earnings: 650 },
  { day: "Tue", earnings: 850 },
  { day: "Wed", earnings: 720 },
  { day: "Thu", earnings: 1100 },
  { day: "Fri", earnings: 900 },
  { day: "Sat", earnings: 1350 },
  { day: "Sun", earnings: 1200 },
];

const monthlyData = [
  { day: "Week 1", earnings: 3200 },
  { day: "Week 2", earnings: 4100 },
  { day: "Week 3", earnings: 3800 },
  { day: "Week 4", earnings: 5200 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function EarningsOverview() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const chartData = period === "weekly" ? weeklyData : monthlyData;

  const totalEarnings = chartData.reduce(
    (total, item) => total + item.earnings,
    0,
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Earnings Overview</CardTitle>
            <CardDescription>
              Track your delivery earnings over time.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={period === "weekly" ? "default" : "outline"}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </Button>
            <Button
              size="sm"
              variant={period === "monthly" ? "default" : "outline"}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </Button>
          </div>
          <div className="pt-4">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold">₹{totalEarnings}</h2>
              <span className="flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <TrendingUp className="size-3" />
                +10%
              </span>
            </div>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Compared with the previous {period === "weekly" ? "week" : "month"}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <AreaChart data={chartData} margin={{ left: 12, right: 12, top: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `₹${Number(value)}`}
                />
              }
            />
            <Area
              dataKey="earnings"
              type="monotone"
              fill="var(--color-earnings)"
              fillOpacity={0.25}
              stroke="var(--color-earnings)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
