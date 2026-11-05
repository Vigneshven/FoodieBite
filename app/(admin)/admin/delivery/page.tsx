"use client";

import DeliveriesTable from "@/component/admin/delivery/DeliveriesTable";
import DeliveryFilters, {
  DeliveryDateFilter,
  DeliveryStatusFilter,
} from "@/component/admin/delivery/DeliveryFilters";
import DeliveryPerformance from "@/component/admin/delivery/DeliveryPerformance";
import DeliveryStats from "@/component/admin/delivery/DeliveryStats";
import RecentDeliveryActivity from "@/component/admin/delivery/RecentDeliveryActivity";
import TopDeliveryPartners from "@/component/admin/delivery/TopDeliveryPartners";
import { useState } from "react";

export default function DeliveryPage() {
  const [activeStatus, setActiveStatus] = useState<DeliveryStatusFilter>("All");

  const [search, setSearch] = useState("");

  const [dateRange, setDateRange] = useState<DeliveryDateFilter>("30");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Deliveries</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage all delivery orders
        </p>
      </div>
      <DeliveryStats />
      <DeliveryFilters
        activeStatus={activeStatus}
        onStatusChange={(value) => {
          setActiveStatus(value);
          setCurrentPage(1);
        }}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        dateRange={dateRange}
        onDateRangeChange={(value) => {
          setDateRange(value);
          setCurrentPage(1);
        }}
      />
      <DeliveriesTable
        activeStatus={activeStatus}
        search={search}
        dateRange={dateRange}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DeliveryPerformance />
        <TopDeliveryPartners />
      </div>
      <RecentDeliveryActivity />
    </div>
  );
}
