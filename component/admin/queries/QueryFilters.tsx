"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const queryStatuses = [
  "All",
  "Open",
  "Pending",
  "In Progress",
  "Resolved",
  "Closed",
] as const;

export const queryCategories = [
  "All",
  "Order",
  "Payment",
  "Delivery",
  "Refund",
  "Restaurant",
  "Account",
  "Other",
] as const;

export const queryPriorities = [
  "All",
  "Low",
  "Medium",
  "High",
  "Urgent",
] as const;

export const queryDateRanges = ["all", "today", "7", "30", "90"] as const;

export type QueryStatus = (typeof queryStatuses)[number];
export type QueryCategory = (typeof queryCategories)[number];
export type QueryPriority = (typeof queryPriorities)[number];
export type QueryDateRange = (typeof queryDateRanges)[number];

type QueryFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;

  activeStatus: QueryStatus;
  onStatusChange: (value: QueryStatus) => void;

  category: QueryCategory;
  onCategoryChange: (value: QueryCategory) => void;

  priority: QueryPriority;
  onPriorityChange: (value: QueryPriority) => void;

  dateRange: QueryDateRange;
  onDateRangeChange: (value: QueryDateRange) => void;

  onReset: () => void;
};

export default function QueryFilters({
  search,
  onSearchChange,
  activeStatus,
  onStatusChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  dateRange,
  onDateRangeChange,
  onReset,
}: QueryFiltersProps) {
  const hasActiveFilters =
    search !== "" ||
    activeStatus !== "All" ||
    category !== "All" ||
    priority !== "All" ||
    dateRange !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search ID, customer, email or subject..."
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as QueryCategory)
            }
            className={
              "h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs w-full sm:w-37"
            }
          >
            {queryCategories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(event) =>
              onPriorityChange(event.target.value as QueryPriority)
            }
            className={
              "h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs w-full sm:w-37"
            }
          >
            {queryPriorities.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Priorities" : item}
              </option>
            ))}
          </select>

          <select
            value={dateRange}
            onChange={(event) =>
              onDateRangeChange(event.target.value as QueryDateRange)
            }
            className={
              "h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs w-full sm:w-37"
            }
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="gap-2"
            >
              <X className="size-4" />
              Reset
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />

          <span className="text-sm font-medium">Query Status</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {queryStatuses.map((status) => (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={activeStatus === status ? "default" : "outline"}
              onClick={() => onStatusChange(status)}
              className="shrink-0"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
