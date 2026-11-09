"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          <Select
            value={category}
            onValueChange={(value) => onCategoryChange(value as QueryCategory)}
          >
            <SelectTrigger className="w-full sm:w-37">
              <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent>
              {queryCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item === "All" ? "All Categories" : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={priority}
            onValueChange={(value) => onPriorityChange(value as QueryPriority)}
          >
            <SelectTrigger className="w-full sm:w-35">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>

            <SelectContent>
              {queryPriorities.map((item) => (
                <SelectItem key={item} value={item}>
                  {item === "All" ? "All Priorities" : item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={dateRange}
            onValueChange={(value) =>
              onDateRangeChange(value as QueryDateRange)
            }
          >
            <SelectTrigger className="w-full sm:w-37">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

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
