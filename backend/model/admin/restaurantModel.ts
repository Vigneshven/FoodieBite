// restaurant page

import { prisma } from "@/backend/lib/prisma";

export async function getRestaurantStats() {
  const [
    totalRestaurants,
    activeRestaurants,
    pendingApproval,
    suspendedRestaurants,
  ] = await Promise.all([
    prisma.restaurants.count(),
    prisma.restaurants.count({
      where: {
        status: "active",
      },
    }),
    prisma.restaurants.count({
      where: {
        status: "pending",
      },
    }),
    prisma.restaurants.count({
      where: {
        status: "suspended",
      },
    }),
  ]);
  return {
    totalRestaurants,
    activeRestaurants,
    pendingApproval,
    suspendedRestaurants,
  };
}

export type GetRestaurantsParams = {
  page: number;
  limit: number;
  search: string;
};

export async function getAllRestaurants({
  page,
  limit,
  search,
}: GetRestaurantsParams) {
  const skip = (page - 1) * limit;
  const restaurants = await prisma.restaurants.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { category: { contains: search } },
        ],
      }),
    },
    skip,
    take: limit,
    orderBy: {
      id: "desc",
    },
  });
  const totalRestaurants = await prisma.restaurants.count({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search } },
          { category: { contains: search } },
        ],
      }),
    },
  });
  return {
    restaurants,
    totalRestaurants,
    totalPages: Math.ceil(totalRestaurants / limit),
    currentPage: page,
  };
}
