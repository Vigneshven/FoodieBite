import { Restaurant } from "@/backend/type/restaurant";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type RegisterCustomer = {
  username: string;
  email: string;
  password: string;
};

export async function register(data: RegisterCustomer): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!result.ok) {
    throw new Error("Fail to Register Customer");
  }

  return result;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${BASE_URL}/api/restaurants`, {
    next: { revalidate: 60 },
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
  });

  if (!res.ok) throw new Error("Failed to delete restaurant");

  return res.json();
}
