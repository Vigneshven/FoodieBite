import {
  GetRestaurantsParams,
  RestaurantResponse,
  RestaurantStatsData,
} from "@/api/type/admin/types-api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRestaurantStats(): Promise<RestaurantStatsData> {
  const res = await fetch(`${BASE_URL}/api/admin/restaurants/stats`, {
    method: "GET",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch restaurant stats`);
  }

  return result.data;
}

export async function fetchRestaurants(params: GetRestaurantsParams) {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    search: params.search,
    status: params.status,
    sortBy: params.sortBy,
  });

  const res = await fetch(`${BASE_URL}/api/admin/restaurants?${query}`, {
    method: "GET",
    credentials: "include",
  });

  const result: RestaurantResponse = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return result.data;
}

// update the restaurants status

export async function updateRestaurantStatus(id: string, status: string) {
  const res = await fetch(`${BASE_URL}/api/admin/restaurants/${id}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to update restaurants status");
  }

  return result.data;
}