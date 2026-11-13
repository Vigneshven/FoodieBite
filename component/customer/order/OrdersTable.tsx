import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, ShoppingBag } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type CustomerOrder = {
  id: string;
  restaurant: string;
  items: string;
  date: string;
  amount: number;
  status:
    | "Pending"
    | "Confirmed"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  paymentStatus: "Paid" | "Pending" | "Failed" | "Refunded";
};

type OrderTableProps = {
  orders: CustomerOrder[];
  totalOrders?: number;
};

export default function OrderTable({
  orders,
  totalOrders = orders.length,
}: OrderTableProps) {
  return (
    <div className="border rounded-lg shadow-sm bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between border p-5">
        <div>
          <h2 className="text-lg font-bold  text-gray-400">Order History</h2>
          <p className="mt-1 text-sm font-bold">
            View and manage your previous orders
          </p>
        </div>
        <span className="rounded-lg bg-orange-50">{totalOrders} Orders</span>
      </div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-fullbg-orange-50">
            <ShoppingBag size={28} className="text-orange-900" />
          </div>
          <h3 className="mt-4 font-semibold text-muted-foreground">
            No order found
          </h3>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-sm">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {order.restaurant}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {order.date}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {order.amount}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button size="icon" variant="ghost" />}
                        >
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem align="end">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
