import { Restaurant } from "@/backend/type/restaurant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type RegisterCustomer = {
  username: string;
  email: string;
  password: string;
  role: "customer" | "restaurant_owner";
};

export type LoginCustomer = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  role: "customer" | "restaurant_owner" | "admin";
};

export type AdminAccess = {
  message: string;
  id: number;
  role: "admin";
};

export type CurrentUser = {
  id: number;
  username: string;
  role: "customer" | "restaurant_owner" | "admin";
};

export async function registerCustomer(
  data: RegisterCustomer,
): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Fail to Register Customer");
  }

  return result;
}

export async function login(data: LoginCustomer): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to Login");
  }

  return result;
}

export async function getAdminAccess(
  cookieHeader: string,
): Promise<AdminAccess | null> {
  const res = await fetch(`${BASE_URL}/api/admin`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 403) return null;
  if (!res.ok) throw new Error("Failed to verify admin access");

  return res.json();
}

export async function getCurrentUser(
  cookieHeader: string,
): Promise<CurrentUser | null> {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (res.status === 401 || res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to get current user");

  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to log out");
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${BASE_URL}/api/restaurants`, {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to Fetch Restaurants");
  }

  return res.json();
}

export async function getRestaurantById(
  id: string,
): Promise<Restaurant | null> {
  const res = await fetch(`${BASE_URL}/api/restaurants/${id}`, {
    next: { revalidate: 60 },
    credentials: "include",
  });

  if (res.status === 404) return null;

  if (!res.ok) throw new Error("Failed to show restaurant");

  return res.json();
}

export async function addRestaurantInDb(data: {
  name: string;
  image: string;
  category: string;
}) {
  const res = await fetch(`${BASE_URL}/api/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add restaurant");
  }

  return res.json();
}

export async function deleteRestaurantInDb(name: string) {
  const res = await fetch(`${BASE_URL}/api/restaurants/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete restaurant");

  return res.json();
}
