"use client";

import {
  GetRestaurantsParams,
  RestaurantSortBy,
  RestaurantStatus,
} from "@/api/admin/type/admin/types-api";
import { connectNotificationStream } from "@/api/notification/api";
import AddRestaurantDialog from "@/component/admin/restaurants/AddRestaurantDialog";
import RestaurantFilters from "@/component/admin/restaurants/RestaurantFilters";
import RestaurantTable from "@/component/admin/restaurants/RestaurantsTable";
import RestaurantStats from "@/component/admin/restaurants/RestaurantStats";
import { useRestaurantStore } from "@/store/admin/restaurantStore";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";

export default function RestaurantPage() {
  const [activeStatus, setActiveStatus] = useState<RestaurantStatus | "All">(
    "All",
  );
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<RestaurantSortBy>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [ownerCurrentPage, setOwnerCurrentPage] = useState(1);
  const [ownerPageSize, setOwnerPageSize] = useState(5);

  const restaurants = useRestaurantStore((state) => state.restaurants);
  const stats = useRestaurantStore((state) => state.stats);

  const ownerRequests = useRestaurantStore((state) => state.ownerRequests);
  const setOwnerRequests = useRestaurantStore(
    (state) => state.setOwnerRequests,
  );

  const refreshData = useRestaurantStore((state) => state.refreshData);
  const totalRestaurants = useRestaurantStore((state) => state.totalRestaurants);
  const setTotalRestaurants = useRestaurantStore(
    (state) => state.setTotalRestaurants,
  );
  const isLoading = useRestaurantStore((state) => state.isLoading);

  const paramsRef = useRef<GetRestaurantsParams>({
    page: currentPage,
    limit: pageSize,
    search,
    status: activeStatus,
    sortBy,
  });

  useEffect(() => {
    paramsRef.current = {
      page: currentPage,
      limit: pageSize,
      search,
      status: activeStatus,
      sortBy,
    };
  }, [currentPage, pageSize, search, activeStatus, sortBy]);

  const loadData = useCallback(async () => {
    try {
      await refreshData(paramsRef.current);
    } catch {
      toast.error("Failed to fetch restaurant data");
    }
  }, [refreshData]);

  useEffect(() => {
    void loadData();
  }, [currentPage, pageSize, search, activeStatus, sortBy, loadData]);

  useEffect(() => {
    const eventSource = connectNotificationStream((notification) => {
      if (notification.type === "restaurant_profile_submitted") {
        void loadData();
      }
    });

    return () => eventSource.close();
  }, [loadData]);

  const safeOwnerPage = Math.min(
    ownerCurrentPage,
    Math.max(1, Math.ceil(ownerRequests.length / ownerPageSize)),
  );
  const paginatedOwnerRequests = ownerRequests.slice(
    (safeOwnerPage - 1) * ownerPageSize,
    safeOwnerPage * ownerPageSize,
  );

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
        ownerRequests={paginatedOwnerRequests}
        onOwnerRequestsChange={setOwnerRequests}
        onReviewComplete={loadData}
        activeStatus={activeStatus}
        loading={isLoading}
        totalItems={totalRestaurants}
        onTotalItemsChange={setTotalRestaurants}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
        ownerTotalItems={ownerRequests.length}
        ownerCurrentPage={safeOwnerPage}
        ownerPageSize={ownerPageSize}
        onOwnerPageChange={setOwnerCurrentPage}
        onOwnerPageSizeChange={(size) => {
          setOwnerPageSize(size);
          setOwnerCurrentPage(1);
        }}
      />
    </div>
  );
}
