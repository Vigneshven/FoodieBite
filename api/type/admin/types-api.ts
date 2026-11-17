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
