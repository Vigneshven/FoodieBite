import { RestaurantStatsData } from "@/api/type/admin/types-api";

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
