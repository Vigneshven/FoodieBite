import {
  AcceptRestaurantInvitationResponse,
  RestaurantForm,
} from "./type/types";

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

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to update restaurant details");
  }

  return result;
}

export async function acceptRestaurantInvitation(
  token: string,
): Promise<AcceptRestaurantInvitationResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/accept-restaurant-invitation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to accept restaurant invitation");
  }

  return result;
}

export async function createMyRestaurant(data: RestaurantForm) {
  const res = await fetch(`${BASE_URL}/api/restaurant-owner/restaurant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Failed to submit restaurant profile");
  }

  return result;
}
