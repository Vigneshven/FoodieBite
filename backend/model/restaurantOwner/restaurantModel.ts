import { prisma } from "@/backend/lib/prisma";
import { UpdateRestaurantData } from "./types/types";

export async function getRestaurantByOwnerEmail(email: string) {
  const restaurant = await prisma.restaurants.findFirst({
    where: {
      email: email,
    },
  });
  return restaurant;
}

export async function updateRestaurantByOwnerEmail(
  email: string,
  data: UpdateRestaurantData,
) {
  const restaurant = await getRestaurantByOwnerEmail(email);

  if (!restaurant) {
    return null;
  }

  const updateRestaurant = await prisma.restaurants.update({
    where: { id: restaurant.id },
    data: {
      ...data,
    },
  });

  return updateRestaurant;
}
