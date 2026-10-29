import { Restaurant } from "@/backend/type/restaurant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${BASE_URL}/api/restaurants`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to Fetch Restaurants");
  }

  return res.json();
}
