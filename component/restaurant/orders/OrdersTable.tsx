import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderStatus, PaymentStatus } from "./OrderFilters";
import type { RestaurantOrderListItem } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type RestaurantOrder = RestaurantOrderListItem;

type OrdersTableProps = {
  orders: RestaurantOrder[];
  totalOrders?: number;
  onViewDetails: (order: RestaurantOrder) => void;
};

const orderStatusStyles: Record<OrderStatus, string> = {
  New: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Confirmed: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100",
  Preparing: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Ready: "bg-purple-100 text-purple-700 hover:bg-purple-100",
  Completed: "bg-green-100 text-green-700 hover:bg-green-100",
  Cancelled: "bg-red-100 text-red-700 hover:bg-red-100",
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-100",
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Failed: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function OrdersTable({
  orders,
  totalOrders = orders.length,
  onViewDetails,
}: OrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders ({totalOrders})</CardTitle>
        <CardDescription>
          Manage and track orders received by your restaurant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-medium">No orders found</p>
          </div>
        ) : (
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
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.totalItems} items</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>
                      <Badge
                        className={paymentStatusStyles[order.paymentStatus]}
                      >
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Badge className={orderStatusStyles[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="outline" size="sm" />}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewDetails(order)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
