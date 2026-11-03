"use client";

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
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = {
  weekly: [
    { date: "Mon", revenue: 10000 },
    { date: "Tue", revenue: 20000 },
    { date: "Wed", revenue: 30000 },
    { date: "Thur", revenue: 10000 },
    { date: "Fri", revenue: 50000 },
    { date: "Sat", revenue: 10000 },
    { date: "Sun", revenue: 70000 },
  ],
  montly: [
    { date: "week 1", revenue: 10000 },
    { date: "week 2", revenue: 40000 },
    { date: "week 3", revenue: 10000 },
    { date: "week 4", revenue: 20000 },
  ],
  yearly: [
    { date: "Jan", revenue: 10000 },
    { date: "Feb", revenue: 20000 },
    { date: "Mar", revenue: 10000 },
    { date: "Apr", revenue: 40000 },
    { date: "May", revenue: 20000 },
    { date: "Jun", revenue: 10000 },
    { date: "Jul", revenue: 50000 },
    { date: "Aug", revenue: 80000 },
    { date: "Sep", revenue: 10000 },
    { date: "Oct", revenue: 400000 },
    { date: "Nov", revenue: 50000 },
    { date: "Dec", revenue: 10000 },
  ],
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Period = keyof typeof chartData;

export default function RevenueAnalytics() {
  const [period, setPeriod] = useState<Period>("weekly");

  const data = chartData[period];

  return (
    <Card className="gap-4">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">
            Revenue Analytics
          </CardTitle>
          <CardDescription>Track Tour business revenue</CardDescription>
        </div>
        <div className="flex w-fit items-center gap-1 rounded-lg border bg-gray-400 p-1">
          {(["weekly", "montly", "yearly"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                period === item
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full sm:h-80">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 10 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={12}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />
              }
            />
            <Area
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
        <p className="mt-3 text-xs text-muted-foreground">
          Sample revenue data
        </p>
      </CardContent>
    </Card>
  );
}
