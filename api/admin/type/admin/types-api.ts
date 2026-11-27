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
  rejectedApproval: number;
};

// restaurantpage table

export type RestaurantStatus = "active" | "pending" | "suspended" | "rejected";

export type RestaurantSortBy = "newest" | "name" | "highest-rating";

export type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  status: RestaurantStatus;
  contact: string;
  joinDate: string;
  onboardingStatus?: RestaurantOnboardingStatus;
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

// restaurant owner onboarding

export type RestaurantOnboardingStatus =
  | "not_required"
  | "pending_invitation"
  | "invited"
  | "profile_pending"
  | "pending_review"
  | "completed"
  | "rejected";

export type RestaurantOwnerRequest = {
  id: number;
  username: string;
  email: string;
  onboardingStatus: RestaurantOnboardingStatus;
  createdAt: string;
  restaurant: {
    id: number;
  } | null;
};

export type RestaurantReview = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  image: string;
  logo: string | null;
  description: string | null;
  restaurantType: string | null;
  category: string | null;
  cuisines: string | null;

  streetAddress: string | null;
  landmark: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;

  status: "active" | "pending" | "suspended" | "rejected";
  rejectionReason: string | null;

  openingHours: OpeningHours[] | null;

  owner: {
    id: number;
    username: string;
    email: string;
  } | null;
};

export type OpeningHours = {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  isClosed: boolean;
  is24Hours: boolean;
  openTime: string;
  closeTime: string;
};
