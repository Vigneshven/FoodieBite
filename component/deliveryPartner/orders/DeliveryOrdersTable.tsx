"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DeliveryOrderStatus } from "./DeliveryOrderFilters";
import { MapPin, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import DeliveryOrderPagination from "./DeliveryOrderPagination";

export type DeliveryOrder = {
  id: string;
  restaurant: string;
  customer: string;
  pickupAddress: string;
  deliveryAddress: string;
  assignedDate: string;
  date: string;
  fee: number;
  status: Exclude<DeliveryOrderStatus, "All">;
};

type DeliveryOrdersTableProps = {
  orders: DeliveryOrder[];
};

const statusStyles: Record<DeliveryOrder["status"], string> = {
  "New Request": "bg-blue-100 text-blue-700",
  Accepted: "bg-purple-100 text-purple-700",
  "Picked Up": "bg-orange-100 text-orange-700",
  "Out for Delivery": "bg-yellow-100 text-yellow-700",
  Delivered: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function DeliveryOrdersTable({
  orders,
}: DeliveryOrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedOrders = orders.slice(
    (visiblePage - 1) * pageSize,
    visiblePage * pageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="font-semibold">Delivery Orders</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your assigned delivery orders.
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Restaurant & Customer</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead>Delivery Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  No delivery orders found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium">{order.id}</p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2 flex gap-10">
                      <div className="flex items-center gap-2">
                        <Store className="size-3 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {order.restaurant}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <p className="flex items-start gap-1.5 text-xs">
                        <MapPin className="mt-1 size-3 shrink-0 text-green-600" />
                        {order.pickupAddress}
                      </p>

                      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="mt-0.5 size-3.5 shrink-0 text-blue-600" />
                        {order.deliveryAddress}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.assignedDate}
                  </TableCell>
                  <TableCell className="font-medium">₹{order.fee}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusStyles[order.status]}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DeliveryOrderPagination
        currentPage={visiblePage}
        totalItems={orders.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
