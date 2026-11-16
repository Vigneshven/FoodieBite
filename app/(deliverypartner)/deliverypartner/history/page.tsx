"use client";

import HistoryFilters, {
  type HistoryStatus,
} from "@/component/deliveryPartner/history/HistoryFilters";
import HistoryPageHeader from "@/component/deliveryPartner/history/HistoryPageHeader";
import HistoryStats from "@/component/deliveryPartner/history/HistoryStats";
import HistoryTable, {
  type HistoryDelivery,
} from "@/component/deliveryPartner/history/HistoryTable";
import HistoryPagination from "@/component/deliveryPartner/history/HistoryPagination";
import { useState } from "react";

const Deliveries: HistoryDelivery[] = [
  {
    id: "#ORD-1",
    restaurant: "a2b",
    customer: "viki",
    date: "Nov 16, 2026, 12:30 PM",
    earnings: 85,
    status: "Completed",
  },
  {
    id: "#ORD-2",
    restaurant: "a2b",
    customer: "viki",
    date: "Nov 16, 2026, 11:15 AM",
    earnings: 0,
    status: "Rejected",
  },
  {
    id: "#ORD-3",
    restaurant: "a2b",
    customer: "viki",
    date: "Nov 15, 2026, 08:45 PM",
    earnings: 95,
    status: "Completed",
  },
  {
    id: "#ORD-4",
    restaurant: "a2b",
    customer: "viki",
    date: "Nov 14, 2026, 07:20 PM",
    earnings: 0,
    status: "Cancelled",
  },
  {
    id: "#ORD-5",
    restaurant: "a2b",
    customer: "viki",
    date: "Nov 12, 2026, 01:00 PM",
    earnings: 75,
    status: "Completed",
  },
];

export default function DeliveryHistoryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<HistoryStatus>("All");
  const [dateRange, setDateRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const updateSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateStatus = (value: HistoryStatus) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const updateDateRange = (value: string) => {
    setDateRange(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setDateRange("all");
    setCurrentPage(1);
  };

  const filteredDeliveries = Deliveries.filter((delivery) => {
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm) ||
      delivery.restaurant.toLowerCase().includes(searchTerm) ||
      delivery.customer.toLowerCase().includes(searchTerm);
    const matchesStatus = status === "All" || delivery.status === status;

    const orderDate = new Date(delivery.date);
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );
    const startOfSevenDays = new Date(startOfToday);
    startOfSevenDays.setDate(startOfSevenDays.getDate() - 6);
    const startOfThirtyDays = new Date(startOfToday);
    startOfThirtyDays.setDate(startOfThirtyDays.getDate() - 29);
    const startOfNinetyDays = new Date(startOfToday);
    startOfNinetyDays.setDate(startOfNinetyDays.getDate() - 89);

    let matchesDate = true;
    if (dateRange === "today") {
      matchesDate = orderDate >= startOfToday && orderDate < endOfToday;
    } else if (dateRange === "7") {
      matchesDate = orderDate >= startOfSevenDays && orderDate < endOfToday;
    } else if (dateRange === "30") {
      matchesDate = orderDate >= startOfThirtyDays && orderDate < endOfToday;
    } else if (dateRange === "90") {
      matchesDate = orderDate >= startOfNinetyDays && orderDate < endOfToday;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <HistoryPageHeader />
      <HistoryStats />
      <HistoryFilters
        search={search}
        onSearchChange={updateSearch}
        status={status}
        onStatusChange={updateStatus}
        dateRange={dateRange}
        onDateRangeChange={updateDateRange}
        onReset={resetFilters}
      />
      <HistoryTable deliveries={paginatedDeliveries} />
      <HistoryPagination
        currentPage={currentPage}
        totalItems={filteredDeliveries.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
