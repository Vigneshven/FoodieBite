"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export const customersStatuses = ["All", "Active", "Inactive"];

export type CustomerStatusFilter = (typeof customersStatuses)[number];

export type CustomerSortsOption = "newest" | "name" | "orders" | "spent";

type CustomerFiltersProps = {
  activeStatus: CustomerStatusFilter;
  onStatusChange: (status: CustomerStatusFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: CustomerSortsOption;
  onSortChange: (value: CustomerSortsOption) => void;
};

export default function CustomerFilters({
  activeStatus,
  onStatusChange,
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}: CustomerFiltersProps) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Customers"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 w-full bg-background rounded-lg pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>
      <div>
        {customersStatuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${activeStatus === status ? "bg-orange-600 text-white font-medium shadow-sm text-lg hover:cursor-pointer" : "text-sm font-medium hover:cursor-pointer"}`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <SlidersHorizontal
          className="h-4 w-4 text-muted-foreground"
          size={16}
        />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as CustomerSortsOption)}
          className="h-10 rounded-lg border bg-background px-3 outline-none"
        >
          <option value="newest">newest</option>
          <option value="name">name</option>
          <option value="orders">Most Orders</option>
          <option value="spent">Highest spending</option>
        </select>
      </div>
    </div>
  );
}
