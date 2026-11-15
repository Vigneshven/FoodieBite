import { Badge } from "@/components/ui/badge";
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
import { Button } from "@base-ui/react";
import { ArrowRight } from "lucide-react";

export type RecentOrder = {
  id: string;
  customer: string;
  items: string;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  status:
    | "New"
    | "Confirmed"
    | "Preparing"
    | "Ready"
    | "Completed"
    | "Cancelled";
  date: string;
};

const orders: RecentOrder[] = [
  {
    id: "ORD-1",
    customer: "vignesh",
    items: "2 ",
    amount: 450,
    paymentStatus: "Paid",
    status: "Preparing",
    date: "Today, 10:30 AM",
  },
  {
    id: "ORD-2",
    customer: "viki",
    items: "3",
    amount: 680,
    paymentStatus: "Paid",
    status: "Confirmed",
    date: "Today, 10:15 AM",
  },
];

const statusStyles: Record<RecentOrder["status"], string> = {
  New: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Confirmed: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  Preparing: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Ready: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Completed: "bg-green-100 text-green-700 hover:bg-green-100",
  Cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

const paymentStyles: Record<RecentOrder["paymentStatus"], string> = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-100",
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Failed: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function RecentOrders() {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              look at your latest restaurant orders.
            </CardDescription>
          </div>

          <Button variant="outline" size="sm" className="hover:cursor-pointer">
            View all orders
            <ArrowRight className="ml-2 size-4 inline-flex" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={paymentStyles[order.paymentStatus]}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Badge className={statusStyles[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
