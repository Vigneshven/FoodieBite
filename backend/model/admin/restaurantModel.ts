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

// restaurant table

export type RestaurantStatusFilter = "All" | "active" | "pending" | "suspended";

export type RestaurantSortOptions = "newest" | "name" | "highest-rating";

export type GetRestaurantsParams = {
  page: number;
  limit: number;
  search: string;
  status: RestaurantStatusFilter;
  sortBy: RestaurantSortOptions;
};

export async function getAllRestaurants({
  page,
  limit,
  search,
  status,
  sortBy,
}: GetRestaurantsParams) {
  const skip = (page - 1) * limit;
  const where = {
    ...(status !== "All" && {
      status,
    }),
    ...(search && {
      OR: [{ name: { contains: search } }, { category: { contains: search } }],
    }),
  };
  const restaurants = await prisma.restaurants.findMany({
    where,
    skip,
    take: limit,
    orderBy:
      sortBy === "name"
        ? { name: "asc" }
        : sortBy === "highest-rating"
          ? { rating: "desc" }
          : { createdAt: "desc" },
  });
  const totalRestaurants = await prisma.restaurants.count({
    where: {
      ...(status !== "All" && {
        status,
      }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { category: { contains: search } },
        ],
      }),
    },
  });
  return {
    restaurants: restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.category,
      rating: restaurant.rating,
      status: restaurant.status,
      contact: restaurant.phone,
      joinDate: restaurant.createdAt.toISOString().split("T")[0],
    })),
    totalRestaurants,
    totalPages: Math.ceil(totalRestaurants / limit),
    currentPage: page,
  };
}

export async function updateRestaurantStatus(
  id: number,
  status: "active" | "pending" | "suspended",
) {
  const restaurant = await prisma.restaurants.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });
  return restaurant;
}
