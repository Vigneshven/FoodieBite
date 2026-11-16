"use client";

import OrderFilters from "@/component/restaurant/orders/OrderFilters";
import OrdersTable from "@/component/restaurant/orders/OrdersTable";
import type { RestaurantOrder } from "@/component/restaurant/orders/OrdersTable";
import OrderStats from "@/component/restaurant/orders/OrderStats";
import OrderPagination from "@/component/customer/order/CustomerOrderPagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sampleOrders: RestaurantOrder[] = [
  {
    id: "ORD-1",
    customer: "vignesh",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 2,
    amount: 450,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Preparing",
    date: "2026-11-15",
  },
  {
    id: "ORD-2",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 3,
    amount: 680,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "New",
    date: "2026-11-15",
  },
  {
    id: "ORD-3",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 1,
    amount: 220,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Completed",
    date: "2026-11-14",
  },
  {
    id: "ORD-4",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 2,
    amount: 520,
    paymentMethod: "Online",
    paymentStatus: "Failed",
    status: "Cancelled",
    date: "2026-11-14",
  },
  {
    id: "ORD-5",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 2,
    amount: 390,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Confirmed",
    date: "2026-11-13",
  },
  {
    id: "ORD-6",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 2,
    amount: 550,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Ready",
    date: "2026-11-12",
  },
  {
    id: "ORD-7",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 1,
    amount: 280,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Preparing",
    date: "2026-11-10",
  },
  {
    id: "ORD-8",
    customer: "viki",
    items: ["Chicken Biryani", "Coke"],
    totalItems: 2,
    amount: 320,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Completed",
    date: "2026-11-05",
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [date, setDate] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [selectedOrder, setSelectedOrder] = useState<RestaurantOrder | null>(
    null,
  );

  const router = useRouter();

  const updateSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateStatus = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const updatePaymentStatus = (value: string) => {
    setPaymentStatus(value);
    setCurrentPage(1);
  };

  const updateDate = (value: string) => {
    setDate(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setPaymentStatus("All");
    setDate("All");
    setCurrentPage(1);
  };

  const filteredOrders = sampleOrders.filter((order) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      order.id.toLowerCase().includes(searchValue) ||
      order.customer.toLowerCase().includes(searchValue) ||
      order.items.some((item) => item.toLowerCase().includes(searchValue));

    const matchesStatus = status === "All" || order.status === status;

    const matchesPayment =
      paymentStatus === "All" || order.paymentStatus === paymentStatus;

    const orderDate = new Date(order.date);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const startOfSevenDays = new Date(startOfToday);
    startOfSevenDays.setDate(startOfSevenDays.getDate() - 6);

    const startOfThirtyDays = new Date(startOfToday);
    startOfThirtyDays.setDate(startOfThirtyDays.getDate() - 29);

    let matchesDate = true;

    if (date === "Today") {
      matchesDate =
        orderDate >= startOfToday &&
        orderDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    } else if (date === "Yesterday") {
      matchesDate = orderDate >= startOfYesterday && orderDate < startOfToday;
    } else if (date === "7") {
      matchesDate =
        orderDate >= startOfSevenDays &&
        orderDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    } else if (date === "30") {
      matchesDate =
        orderDate >= startOfThirtyDays &&
        orderDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const totalOrders = filteredOrders.length;

  const totalPages = Math.max(1, Math.ceil(totalOrders / pageSize));

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewDetails = (order: RestaurantOrder) => {
    router.push(`/restaurant/orders/${order.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all orders received by your restaurant.
        </p>
      </div>

      <OrderStats />
      <OrderFilters
        search={search}
        onSearchChange={updateSearch}
        status={status}
        onStatusChange={updateStatus}
        paymentStatus={paymentStatus}
        onPaymentStatusChange={updatePaymentStatus}
        date={date}
        onDateChange={updateDate}
        onReset={resetFilters}
      />
      <OrdersTable
        orders={paginatedOrders}
        totalOrders={totalOrders}
        onViewDetails={handleViewDetails}
      />
      <OrderPagination
        currentPage={currentPage}
        totalItems={totalOrders}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
      <Dialog
        open={selectedOrder !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Order details for {selectedOrder?.customer}.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2 text-sm">
              <p>Items: {selectedOrder.items.join(", ")}</p>
              <p>Total items: {selectedOrder.totalItems}</p>
              <p>Amount: ₹{selectedOrder.amount}</p>
              <p>Payment: {selectedOrder.paymentMethod}</p>
              <p>Payment status: {selectedOrder.paymentStatus}</p>
              <p>Status: {selectedOrder.status}</p>
              <p>Date: {new Date(selectedOrder.date).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
