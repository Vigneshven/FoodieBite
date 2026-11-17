import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

type RecentEarning = {
  id: string;
  restaurant: string;
  date: string;
  earnings: number;
};

const recentEarnings: RecentEarning[] = [
  {
    id: "#ORD-1",
    restaurant: "a2b",
    date: "Nov 16, 2026, 12:30 PM",
    earnings: 85,
  },
  {
    id: "#ORD-2",
    restaurant: "a2b",
    date: "Nov 12, 2026, 12:30 PM",
    earnings: 85,
  },
  {
    id: "#ORD-3",
    restaurant: "a2b",
    date: "Nov 14, 2026, 12:30 PM",
    earnings: 85,
  },
  {
    id: "#ORD-4",
    restaurant: "a2b",
    date: "Nov 15, 2026, 12:30 PM",
    earnings: 85,
  },
  {
    id: "#ORD-5",
    restaurant: "a2b",
    date: "Nov 17, 2026, 10:30 PM",
    earnings: 1000,
  },
];
export default function RecentEarnings() {
  const totalEarnings = recentEarnings.reduce(
    (total, item) => total + item.earnings,
    0,
  );
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Earnings</CardTitle>
            <CardDescription>
              Earnings from your recent completed delivery
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Link href={`'/delivery/history`}>
              View All
              <ArrowRight className="inline-flex ml-2 size-4" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 pt-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <TrendingUp className="size-4" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Earnings from these deliveries
            </p>
            <p className="font-semibold">₹{totalEarnings}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentEarnings.map((earns) => (
              <TableRow key={earns.id}>
                <TableCell className="font-medium">{earns.id}</TableCell>
                <TableCell className="font-medium">
                  {earns.restaurant}
                </TableCell>
                <TableCell className="font-medium">{earns.date}</TableCell>
                <TableCell className="text-right font-medium">
                  {earns.earnings}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Completed
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
