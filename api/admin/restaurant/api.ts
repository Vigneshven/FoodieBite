import {
  CreateRestaurantData,
  GetRestaurantsParams,
  RestaurantOwnerRequest,
  RestaurantResponse,
  RestaurantStatsData,
} from "@/api/admin/type/admin/types-api";

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

// add restaurant in restaurant page using form

export async function createRestaurant(data: CreateRestaurantData) {
  const res = await fetch(`${BASE_URL}/api/admin/restaurants`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to add restaurants");
  }

  return result.data;
}

// get restaurant owner requests

export async function fetchRestaurantOwnerRequests(): Promise<
  RestaurantOwnerRequest[]
> {
  const res = await fetch(`${BASE_URL}/api/admin/restaurants/owner-requests`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants owner requests");
  }

  return result.data;
}

// send invitation to restaurant owner via emails

export async function sendRestaurantOwnerInvitation(userId: number) {
  const res = await fetch(
    `${BASE_URL}/api/admin/restaurants/owner-requests/${userId}/invite`,
    {
      method: "POST",
      credentials: "include",
    },
  );
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to send restaurants owner invitation");
  }

  return result.data;
}
