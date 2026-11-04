"use client";

import CustomerFilters, {
  CustomerSortsOption,
  CustomerStatusFilter,
} from "@/component/admin/customers/CustomerFilters";
import CustomerStats from "@/component/admin/customers/CustomerStats";
import CustomerTable from "@/component/admin/customers/CustomerTable";
import { useState } from "react";

export default function CustomerPage() {
  const [activeStatus, setActiveStatus] = useState<CustomerStatusFilter>("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<CustomerSortsOption>("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage all customers</p>
        </div>
      </div>
      <CustomerStats />
      <CustomerFilters
        activeStatus={activeStatus}
        onStatusChange={(status) => {
          setActiveStatus(status);
          setCurrentPage(1);
        }}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortChange={(value) => {
          setSortBy(value);
          setCurrentPage(1);
        }}
      />
      <CustomerTable
        activeStatus={activeStatus}
        search={search}
        sortBy={sortBy}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
