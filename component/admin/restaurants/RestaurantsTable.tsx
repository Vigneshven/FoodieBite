"use client";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Ban,
  CheckCircle2,
  Trash2,
  Star,
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

import type {
  RestaurantStatusFilter,
  RestaurantSortOption,
} from "./RestaurantFilters";
import RestaurantPagination from "./RestaurantPagination";

type RestaurantStatus = "Active" | "Pending" | "Suspended";

type Restaurant = {
  id: string;
  name: string;
  email: string;
  cuisine: string;
  rating: number;
  reviews: number;
  status: RestaurantStatus;
  phone: string;
  joinDate: string;
};

const restaurants: Restaurant[] = [
  {
    id: "#R-1",
    name: "Pizza Palace",
    email: "pizza@palace.com",
    cuisine: "Italian",
    rating: 4.6,
    reviews: 4,
    status: "Active",
    phone: "+91 12345 67890",
    joinDate: "2026-01-15",
  },
  {
    id: "#R-2",
    name: "South Indian Meals",
    email: "southIndian@palace.com",
    cuisine: "Indian",
    rating: 4.9,
    reviews: 100,
    status: "Active",
    phone: "+91 12395 67890",
    joinDate: "2026-01-01",
  },
  {
    id: "#R-3",
    name: "Spicy Fries",
    email: "spicy@fries.com",
    cuisine: "American",
    rating: 4.6,
    reviews: 4,
    status: "Active",
    phone: "+91 12145 67890",
    joinDate: "2026-01-15",
  },
  {
    id: "#R-4",
    name: "Burger House",
    email: "Burger@house.com",
    cuisine: "American",
    rating: 3.6,
    reviews: 10,
    status: "Active",
    phone: "+91 11345 67890",
    joinDate: "2026-01-10",
  },
  {
    id: "#R-5",
    name: "Sushi World",
    email: "Sushi@world.com",
    cuisine: "japanese",
    rating: 4.8,
    reviews: 10,
    status: "Pending",
    phone: "+91 12315 67890",
    joinDate: "2026-01-11",
  },
  {
    id: "#R-6",
    name: "Pizza House",
    email: "pizza@house.com",
    cuisine: "Italian",
    rating: 4.1,
    reviews: 1,
    status: "Active",
    phone: "+91 12245 67890",
    joinDate: "2026-03-12",
  },
  {
    id: "#R-7",
    name: "Healthy Bites",
    email: "Healthy@bites.com",
    cuisine: "natural",
    rating: 4.2,
    reviews: 2,
    status: "Suspended",
    phone: "+91 18345 67890",
    joinDate: "2026-02-05",
  },
  {
    id: "#R-8",
    name: "Burger King",
    email: "Burger@king.com",
    cuisine: "American",
    rating: 4.1,
    reviews: 5,
    status: "Active",
    phone: "+91 12347 67890",
    joinDate: "2026-05-13",
  },
];

const statusStyles: Record<RestaurantStatus, string> = {
  Active: "border-green-200 bg-green-50 text-green-700",
  Pending: "border-orange-200 bg-orange-50 text-orange-700",
  Suspended: "border-red-200 bg-red-50 text-red-700",
};

function formatJoinDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type RestaurantsTableProps = {
  activeStatus: RestaurantStatusFilter;
  search: string;
  sortBy: RestaurantSortOption;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function RestaurantsTable({
  activeStatus,
  search,
  sortBy,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: RestaurantsTableProps) {
  const searchText = search.toLowerCase().trim();

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesStatus =
      activeStatus === "All" || restaurant.status === activeStatus;

    const matchesSearch =
      restaurant.id.toLowerCase().includes(searchText) ||
      restaurant.name.toLowerCase().includes(searchText) ||
      restaurant.email.toLowerCase().includes(searchText) ||
      restaurant.cuisine.toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);

      case "rating":
        return b.rating - a.rating;

      case "newest":
      default:
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    }
  });

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedRestaurants = sortedRestaurants.slice(
    startIndex,
    startIndex + pageSize,
  );

  const handleAction = (action: string, restaurant: Restaurant) => {
    console.log(`${action}: ${restaurant.name}`);
  };

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
            {sortedRestaurants.length > 0 ? (
              paginatedRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell className="font-medium">{restaurant.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{restaurant.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {restaurant.email}
                    </div>
                  </TableCell>

                  <TableCell>{restaurant.cuisine}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-muted-foreground">
                        ({restaurant.reviews.toLocaleString("en-IN")})
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
                    <div className="text-sm">{restaurant.phone}</div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatJoinDate(restaurant.joinDate)}
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

                        {restaurant.status === "Pending" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("Approve", restaurant)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}

                        {restaurant.status !== "Suspended" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("Suspend", restaurant)}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleAction("Delete", restaurant)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
        totalItems={sortedRestaurants.length}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
