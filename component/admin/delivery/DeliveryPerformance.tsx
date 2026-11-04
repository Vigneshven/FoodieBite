import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const PerformanceData = [
  { day: "Mon", delivered: 10, delayed: 12 },
  { day: "Tue", delivered: 20, delayed: 10 },
  { day: "Wed", delivered: 20, delayed: 7 },
  { day: "Thu", delivered: 3, delayed: 1 },
  { day: "Fri", delivered: 5, delayed: 4 },
  { day: "Sat", delivered: 15, delayed: 6 },
  { day: "Sun", delivered: 100, delayed: 13 },
];

const chartConfig = {
  delivered: {
    label: "Delivered",
    color: "#16A34A",
  },
  delayed: {
    label: "Delayed",
    color: "#F97316",
  },
} satisfies ChartConfig;

export default function DeliveryPerformance() {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <div>
          <div>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>
              Weekly comparsion of delivered and delayed orders
            </CardDescription>
          </div>
          <span>Last 7 Days</span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <LineChart
            accessibilityLayer
            data={PerformanceData}
            margin={{ left: 8, right: 12, top: 10, bottom: 5 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
            />

            <ChartTooltip
              shared={false}
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Line
              dataKey="delivered"
              type="monotone"
              stroke="var(--color-delivered)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--color-delivered)",
              }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="delayed"
              type="monotone"
              stroke="var(--color-delayed)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--color-delayed)",
              }}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
