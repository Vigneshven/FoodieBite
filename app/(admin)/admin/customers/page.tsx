"use client";

import { fetchCustomers } from "@/api/admin/customer/api";
import { CustomerSortBy, CustomerStatus } from "@/api/type/admin/types-api";
import CustomerFilters from "@/component/admin/customers/CustomerFilters";
import CustomerStats from "@/component/admin/customers/CustomerStats";
import CustomerTable from "@/component/admin/customers/CustomerTable";
import { useCustomerStore } from "@/store/admin/customerStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CustomerPage() {
  const [activeStatus, setActiveStatus] = useState<CustomerStatus | "All">(
    "All",
  );

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<CustomerSortBy>("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [totalCustomers, setTotalCustomers] = useState(0);

  const [loading, setLoading] = useState(false);

  const customers = useCustomerStore((state) => state.customers);
  const setCustomers = useCustomerStore((state) => state.setCustomers);

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true);
        const result = await fetchCustomers({
          page: currentPage,
          limit: pageSize,
          search,
          status: activeStatus,
          sortBy,
        });
        setCustomers(result.customers);
        setTotalCustomers(result.totalCustomers);
      } catch {
        toast.error("Failed to Show Customer");
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, [currentPage, pageSize, search, activeStatus, sortBy, setCustomers]);

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
        customers={customers}
        activeStatus={activeStatus}
        loading={loading}
        totalItems={totalCustomers}
        onTotalItemsChange={setTotalCustomers}
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
