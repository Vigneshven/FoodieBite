import { prisma } from "@/backend/lib/prisma";
import { CreateRestaurantData, UpdateRestaurantData } from "./types/types";

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

export async function getRestaurantByOwnerId(ownerId: number) {
  return prisma.restaurants.findUnique({
    where: {
      ownerId,
    },
  });
}

export async function createRestaurantForOwner(
  ownerId: number,
  data: CreateRestaurantData,
) {
  return prisma.$transaction(async (tx) => {
    const owner = await tx.customers.findUnique({
      where: { id: ownerId },
    });
    if (!owner || owner.role !== "restaurant_owner") {
      throw new Error("RESTAURANT_OWNER_NOT_FOUND");
    }
    if (owner.onboardingStatus !== "profile_pending") {
      throw new Error("INVALID_ONBOARDING_STATUS");
    }
    const existingRestaurant = await tx.restaurants.findUnique({
      where: { ownerId },
    });

    if (existingRestaurant) {
      throw new Error("RESTAURANT_ALREADY_EXISTS");
    }

    const restaurant = await tx.restaurants.create({
      data: {
        ...data,
        ownerId,
        status: "pending",
      },
    });

    await tx.customers.update({
      where: {
        id: ownerId,
      },
      data: {
        onboardingStatus: "pending_review",
      },
    });
    return restaurant;
  });
}
