import { RestaurantForm } from "./type/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyRestaurant() {
  const res = await fetch(`${BASE_URL}/api/restaurant-owner/restaurant`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to Fetch Restaurant");
  }

  return result.data;
}

export async function updateMyRestaurant(data: Partial<RestaurantForm>) {
  const res = await fetch(`${BASE_URL}/api/restaurant-owner/restaurant`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = res.json();

  if (!res.ok) {
    throw new Error("Failed to update restaurant details");
  }

  return result;
}
