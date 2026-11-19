// Admin Dashboard stats

export type DashBoardStats = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalRestaurants: number;
};

// customer page

export type CustomerStatus = "active" | "inactive";
export type CustomerSortBy = "name" | "newest";

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: string;
  totalSpend: number;
  status: CustomerStatus;
  joinDate: string;
};

export type GetCustomersParams = {
  page: number;
  limit: number;
  search: string;
  status: CustomerStatus | "All";
  sortBy: CustomerSortBy;
};

export type CustomerResponse = {
  message: string;
  data: {
    customers: Customer[];
    totalCustomers: number;
    totalPages: number;
    currentPage: number;
  };
};

// customerpage stats

export type CustomerStatsData = {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newCustomers: number;
};

// restaurantpage stats

export type RestaurantStatsData = {
  totalRestaurants: number;
  activeRestaurants: number;
  pendingApproval: number;
  suspendedRestaurants: number;
};

// restaurantpage table

export type RestaurantStatus = "active" | "pending" | "suspended";

export type RestaurantSortBy = "newest" | "name" | "highest-rating";

export type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  status: RestaurantStatus;
  contact: string;
  joinDate: string;
};

export type GetRestaurantsParams = {
  page: number;
  limit: number;
  search: string;
  status: RestaurantStatus | "All";
  sortBy: RestaurantSortBy;
};

export type RestaurantResponse = {
  message: string;
  data: {
    restaurants: Restaurant[];
    totalRestaurants: number;
    totalPages: number;
    currentPage: number;
  };
};

// add restaurant in restaurant page using form

export type CreateRestaurantData = {
  name: string;
  email: string;
  phone: string;
};
