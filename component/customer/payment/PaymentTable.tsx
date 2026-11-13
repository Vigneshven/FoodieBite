import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, ShoppingBag } from "lucide-react";
import PaymentStatusBadge from "./PaymentStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type CustomerPayment = {
  id: string;
  orderId: string;
  restaurant: string;
  date: string;
  paymentMethod: "UPI" | "Cash on delivery" | "Card";
  amount: number;
  status: "All" | "Paid" | "Pending" | "Failed" | "Refunded";
};

type PaymentTableProps = {
  payments: CustomerPayment[];
  totalPayments?: number;
};

export default function PaymentTable({
  payments,
  totalPayments = payments.length,
}: PaymentTableProps) {
  return (
    <div className="border rounded-lg shadow-sm bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between border p-5">
        <div>
          <h2 className="text-lg font-bold  text-gray-400">Order History</h2>
          <p className="mt-1 text-sm font-bold">
            View and manage your previous orders
          </p>
        </div>
        <span className="rounded-lg bg-orange-50">{totalPayments} Orders</span>
      </div>
      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-fullbg-orange-50">
            <ShoppingBag size={28} className="text-orange-900" />
          </div>
          <h3 className="mt-4 font-semibold text-muted-foreground">
            No payment found
          </h3>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium text-sm">
                      {payment.id}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {payment.orderId}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {payment.restaurant}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {payment.date}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {payment.amount}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {payment.paymentMethod}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      <PaymentStatusBadge status={payment.status} />
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
                            <Link href={`/customer/payments/${payment.id}`}>
                              View Details
                            </Link>
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
