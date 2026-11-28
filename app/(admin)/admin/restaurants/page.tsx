"use client";

import {
  RestaurantSortBy,
  RestaurantStatus,
} from "@/api/admin/type/admin/types-api";
import AddRestaurantDialog from "@/component/admin/restaurants/AddRestaurantDialog";
import RestaurantFilters from "@/component/admin/restaurants/RestaurantFilters";
import RestaurantTable from "@/component/admin/restaurants/RestaurantsTable";
import RestaurantStats from "@/component/admin/restaurants/RestaurantStats";
import { useRestaurantStore } from "@/store/admin/restaurantStore";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function RestaurantPage() {
  const [activeStatus, setActiveStatus] = useState<RestaurantStatus | "All">(
    "All",
  );
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<RestaurantSortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [totalRestaurants, setTotalRestaurants] = useState(0);

  const [loading, setLoading] = useState(false);

  const restaurants = useRestaurantStore((state) => state.restaurants);
  const stats = useRestaurantStore((state) => state.stats);

  const ownerRequests = useRestaurantStore((state) => state.ownerRequests);
  const setOwnerRequests = useRestaurantStore(
    (state) => state.setOwnerRequests,
  );

  const refreshData = useRestaurantStore((state) => state.refreshData);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        await refreshData({
          page: currentPage,
          limit: pageSize,
          search,
          status: activeStatus,
          sortBy,
        });
      } catch {
        toast.error("Failed to fetch restaurant data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage, pageSize, search, activeStatus, sortBy, refreshData]);

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
        restaurants={restaurants}
        ownerRequests={ownerRequests}
        onOwnerRequestsChange={setOwnerRequests}
        onReviewComplete={() =>
          refreshData({
            page: currentPage,
            limit: pageSize,
            search,
            status: activeStatus,
            sortBy,
          })
        }
        activeStatus={activeStatus}
        loading={loading}
        totalItems={totalRestaurants}
        onTotalItemsChange={setTotalRestaurants}
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
