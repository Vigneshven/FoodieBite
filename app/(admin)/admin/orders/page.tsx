"use client";

import OrderFilters, {
  OrderStatusFilter,
} from "@/component/admin/orders/OrderFilters";
import OrdersTable from "@/component/admin/orders/OrdersTable";
import OrderStat from "@/component/admin/orders/OrderStat";
import { useState } from "react";

export default function OrderPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatusFilter>("All");

  const [search, setSearch] = useState("");

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>

        <p className="text-sm text-muted-foreground">
          Manage and track all orders
        </p>
      </div>
      <OrderStat />

      <OrderFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        search={search}
        onSearchChange={setSearch}
      />
      <OrdersTable activeStatus={activeStatus} search={search} />
    </div>
  );
}
