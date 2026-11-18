"use client";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Ban,
  Star,
  CheckCircle,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import type { RestaurantStatusFilter } from "./RestaurantFilters";
import RestaurantPagination from "./RestaurantPagination";
import { Restaurant } from "@/api/type/admin/types-api";
import { useRestaurantStore } from "@/store/admin/restaurantStore";
import {
  getRestaurantStats,
  updateRestaurantStatus,
} from "@/api/admin/restaurant/api";
import { toast } from "sonner";
import { useState } from "react";

const statusStyles = {
  active: "border-green-200 bg-green-50 text-green-700",
  pending: "border-orange-200 bg-orange-50 text-orange-700",
  suspended: "border-red-200 bg-red-50 text-red-700",
};

type RestaurantsTableProps = {
  restaurants: Restaurant[];
  activeStatus: RestaurantStatusFilter;
  loading: boolean;
  totalItems: number;
  onTotalItemsChange: (total: number) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function RestaurantsTable({
  restaurants,
  activeStatus,
  loading,
  totalItems,
  onTotalItemsChange,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: RestaurantsTableProps) {
  const handleAction = (action: string, restaurant: Restaurant) => {
    console.log(`${action}: ${restaurant.name}`);
  };

  const [updateId, setUpdateId] = useState<string | null>(null);
  const setStats = useRestaurantStore((state) => state.setStats);
  const removeRestaurant = useRestaurantStore(
    (state) => state.removeRestaurant,
  );
  const updateRestaurant = useRestaurantStore(
    (state) => state.updateRestaurant,
  );

  async function handleStatusChange(
    id: string,
    newStatus: "active" | "pending" | "suspended",
  ) {
    try {
      setUpdateId(id);
      await updateRestaurantStatus(String(id), newStatus);
      toast.success("Restaurant status updated successfully");
      const Stats = await getRestaurantStats();
      setStats(Stats);
      if (activeStatus !== "All") {
        removeRestaurant(Number(id));
        onTotalItemsChange(Math.max(0, totalItems - 1));
      } else {
        updateRestaurant(Number(id), newStatus);
      }
    } catch {
      toast.error("failed to update restaurant");
    } finally {
      setUpdateId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="text-lg font-semibold">All Restaurants</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View and manage restaurants on your platform.
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  loading restaurants...
                </TableCell>
              </TableRow>
            ) : restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell className="font-medium">{restaurant.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{restaurant.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {restaurant.name}
                    </div>
                  </TableCell>

                  <TableCell>{restaurant.cuisine}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({restaurant.rating})
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusStyles[restaurant.status]}
                    >
                      {restaurant.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm">{restaurant.contact}</div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {restaurant.joinDate}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Actions for ${restaurant.name}`}
                          />
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleAction("View", restaurant)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleAction("Edit", restaurant)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          disabled={Number(updateId) === restaurant.id}
                          onClick={() =>
                            handleStatusChange(
                              String(restaurant.id),
                              restaurant.status === "active"
                                ? "suspended"
                                : "active",
                            )
                          }
                        >
                          {restaurant.status === "active" ? (
                            <>
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend Restaurant
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate Restaurant
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No restaurants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <RestaurantPagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
