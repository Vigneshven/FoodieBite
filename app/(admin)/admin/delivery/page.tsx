"use client";

import DeliveriesTable from "@/component/admin/delivery/DeliveriesTable";
import DeliveryFilters, {
  DeliveryDateFilter,
  DeliveryStatusFilter,
} from "@/component/admin/delivery/DeliveryFilters";
import DeliveryStats from "@/component/admin/delivery/DeliveryStats";
import { useState } from "react";

export default function DeliveryPage() {
  const [activeStatus, setActiveStatus] = useState<DeliveryStatusFilter>("All");

  const [search, setSearch] = useState("");

  const [dateRange, setDateRange] = useState<DeliveryDateFilter>("30");
  return (
    <div>
      <div className="space-y-6 p-4 md:p-6">
        <h1 className="text-2xl font-bold">Deliveries</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage all delivery orders
        </p>
      </div>
      <DeliveryStats />
      <DeliveryFilters
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        search={search}
        onSearchChange={setSearch}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      <DeliveriesTable
        activeStatus={activeStatus}
        search={search}
        dateRange={dateRange}
      />
    </div>
  );
}
