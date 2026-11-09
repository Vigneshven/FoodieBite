"use client";

import { useState } from "react";

import QueryStats from "@/component/admin/queries/QueryStats";
import QueryFilters from "@/component/admin/queries/QueryFilters";
import QueriesTable from "@/component/admin/queries/QueriesTable";

import type {
  QueryStatus,
  QueryCategory,
  QueryPriority,
  QueryDateRange,
} from "@/component/admin/queries/QueryFilters";

export default function QueriesPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<QueryStatus>("All");
  const [category, setCategory] = useState<QueryCategory>("All");
  const [priority, setPriority] = useState<QueryPriority>("All");
  const [dateRange, setDateRange] = useState<QueryDateRange>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: QueryStatus) => {
    setActiveStatus(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: QueryCategory) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePriorityChange = (value: QueryPriority) => {
    setPriority(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (value: QueryDateRange) => {
    setDateRange(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setActiveStatus("All");
    setCategory("All");
    setPriority("All");
    setDateRange("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Queries</h1>

        <p className="text-sm text-muted-foreground">
          Manage and respond to customer support requests.
        </p>
      </div>

      <QueryStats />

      <QueryFilters
        search={search}
        onSearchChange={handleSearchChange}
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        priority={priority}
        onPriorityChange={handlePriorityChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onReset={handleReset}
      />

      <QueriesTable
        search={search}
        activeStatus={activeStatus}
        category={category}
        priority={priority}
        dateRange={dateRange}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
