"use client";

import { getRestaurantStats } from "@/api/admin/restaurant/api";
import AddRestaurantDialog from "@/component/admin/restaurants/AddRestaurantDialog";
import RestaurantFilters, {
  RestaurantSortOption,
  RestaurantStatusFilter,
} from "@/component/admin/restaurants/RestaurantFilters";
import RestaurantTable from "@/component/admin/restaurants/RestaurantsTable";
import RestaurantStats from "@/component/admin/restaurants/RestaurantStats";
import { useRestaurantStore } from "@/store/admin/restaurantStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RestaurantPage() {
  const [activeStatus, setActiveStatus] =
    useState<RestaurantStatusFilter>("All");

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<RestaurantSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const stats = useRestaurantStore((state) => state.stats);
  const setStats = useRestaurantStore((state) => state.setStats);

  useEffect(() => {
    async function loadStats() {
      try {
        const result = await getRestaurantStats();
        setStats(result);
      } catch {
        toast.error("failed to fetch restaurant stats");
      }
    }
    loadStats();
  }, [setStats]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-sm text-muted-foreground">
            Manage all restaurants
          </p>
        </div>
        <AddRestaurantDialog />
      </div>
      <RestaurantStats statsData={stats} />
      <RestaurantFilters
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

      <RestaurantTable
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
