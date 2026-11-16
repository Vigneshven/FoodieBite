"use client";

import DeliveryOrderFilters, {
  DeliveryOrderStatus,
} from "@/component/deliveryPartner/orders/DeliveryOrderFilters";
import DeliveryOrdersTable, {
  DeliveryOrder,
} from "@/component/deliveryPartner/orders/DeliveryOrdersTable";
import DeliveryOrderStats from "@/component/deliveryPartner/orders/DeliveryOrderStats";
import OrdersPageHeader from "@/component/deliveryPartner/orders/OrdersPageHeader";
import { useState } from "react";

const Orders: DeliveryOrder[] = [
  {
    id: "ORD-1",
    restaurant: "A2B",
    customer: "viki",
    pickupAddress: "katpadi,vellore",
    deliveryAddress: "bayagam,vellore",
    assignedDate: "Nov 16, 2026",
    date: "2026-11-16",
    fee: 65,
    status: "New Request",
  },
  {
    id: "ORD-2",
    restaurant: "A2B",
    customer: "viki",
    pickupAddress: "katpadi,vellore",
    deliveryAddress: "bayagam,vellore",
    assignedDate: "Nov 16, 2026",
    date: "2026-11-16",
    fee: 65,
    status: "Accepted",
  },
  {
    id: "ORD-3",
    restaurant: "A2B",
    customer: "viki",
    pickupAddress: "katpadi,vellore",
    deliveryAddress: "bayagam,vellore",
    assignedDate: "Aug 16, 2026",
    date: "2026-08-16",
    fee: 65,
    status: "Delivered",
  },
  {
    id: "ORD-4",
    restaurant: "A2B",
    customer: "viki",
    pickupAddress: "katpadi,vellore",
    deliveryAddress: "bayagam,vellore",
    assignedDate: "Nov 04, 2026",
    date: "2026-11-04",
    fee: 65,
    status: "Rejected",
  },
  {
    id: "ORD-5",
    restaurant: "A2B",
    customer: "viki",
    pickupAddress: "katpadi,vellore",
    deliveryAddress: "bayagam,vellore",
    assignedDate: "Nov 16, 2026",
    date: "2026-11-16",
    fee: 65,
    status: "Out for Delivery",
  },
];

export default function DeliveryOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<DeliveryOrderStatus>("All");
  const [date, setDate] = useState("All");

  const handleReset = () => {
    setSearch("");
    setStatus("All");
    setDate("All");
  };

  const filteredOrders = Orders.filter((order) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm) ||
      order.restaurant.toLowerCase().includes(searchTerm) ||
      order.customer.toLowerCase().includes(searchTerm);

    const matchesStatus = status === "All" || order.status === status;

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

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-6">
      <OrdersPageHeader />
      <DeliveryOrderStats />
      <DeliveryOrderFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        date={date}
        onDateChange={setDate}
        onReset={handleReset}
      />
      <DeliveryOrdersTable orders={filteredOrders} />
    </div>
  );
}
