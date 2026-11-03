import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RestaurantSortOption,
  RestaurantStatusFilter,
} from "./RestaurantFilters";
import { Badge, MoreHorizontal, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
    joinDate: "15-01-2026",
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
    joinDate: "01-01-2026",
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
    joinDate: "15-01-2026",
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
    joinDate: "10-01-2026",
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
    joinDate: "11-01-2026",
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
    joinDate: "12-03-2026",
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
    joinDate: "05-02-2026",
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
    joinDate: "13-05-2026",
  },
];

const statusStyles: Record<RestaurantStatus, string> = {
  Active: "border-green-200 bg-green-50 text-green-700",
  Pending: "border-orange-200 bg-orange-50 text-orange-700",
  Suspended: "border-red-200 bg-red-50 text-red-700",
};

type RestaurantsTableProps = {
  activeStatus: RestaurantStatusFilter;
  search: string;
  sortBy: RestaurantSortOption;
};

export default function RestaurantTable({
  activeStatus,
  search,
  sortBy,
}: RestaurantsTableProps) {
  const searchText = search.toLowerCase().trim();

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchedStatus =
      activeStatus === "All" || restaurant.status === activeStatus;

    const matchedSearch =
      restaurant.id.toLowerCase().includes(searchText) ||
      restaurant.name.toLowerCase().includes(searchText) ||
      restaurant.email.toLowerCase().includes(searchText) ||
      restaurant.cuisine.toLowerCase().includes(searchText);

    return matchedSearch && matchedStatus;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    }
  });

  const handleAction = (action:string,restaurant:Restaurant)=>{
    
  }

  return (
    <div>
      <div>
        <h2>All Restaurants</h2>
        <p>View and manage restaurants</p>
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRestaurants.length > 0 ? (
              sortedRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <div>{restaurant.name}</div>
                    <div>{restaurant.email}</div>
                  </TableCell>
                  <TableCell>{restaurant.cuisine}</TableCell>
                  <TableCell>
                    <div>
                      <Star />
                      <span>{restaurant.rating}</span>
                      <span>{restaurant.reviews.toLocaleString("en-IN")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge>{restaurant.status}</Badge>{" "}
                  </TableCell>
                  <TableCell>
                    <div>{restaurant.phone}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {new Date(restaurant.joinDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>handleAction("View",restaurant)}>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No Restaurant Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
