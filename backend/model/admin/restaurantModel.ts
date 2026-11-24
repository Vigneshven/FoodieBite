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

// restaurant add using form

export async function findRestaurantByName(name: string) {
  const restaurant = await prisma.restaurants.findFirst({
    where: {
      name: name,
    },
  });
  return restaurant;
}

export async function findRestaurantByPhone(phone: string) {
  const restaurant = await prisma.restaurants.findFirst({
    where: {
      phone: phone,
    },
  });
  return restaurant;
}

// allow admin to create restaurant and automatically create restaurantowner account

export async function createRestaurantWithOwner(data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
}) {
  return prisma.$transaction(async (tx) => {
    const restaurant = await tx.restaurants.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: "",
      },
    });
    const owner = await tx.customers.create({
      data: {
        username: data.name,
        email: data.email,
        password: data.passwordHash,
        role: "restaurant_owner",
        status: "active",
        mustChangePassword: true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return { restaurant, owner };
  });
}

export async function getPendingRestauranOwnerRequest() {
  return prisma.customers.findMany({
    where: {
      role: "restaurant_owner",
      onboardingStatus: {
        in: [
          "pending_invitation",
          "invited",
          "profile_pending",
          "pending_review",
          "completed",
          "rejected",
        ],
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      onboardingStatus: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createRestaurantOwnerInvitation(data: {
  userId: number;
  tokenHash: string;
  expireAt: Date;
}) {
  return prisma.$transaction(async (tx) => {
    const owner = await tx.customers.findFirst({
      where: {
        id: data.userId,
        role: "restaurant_owner",
        onboardingStatus: "pending_invitation",
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
    if (!owner) return null;

    const update = await tx.customers.updateMany({
      where: {
        id: data.userId,
        role: "restaurant_owner",
        onboardingStatus: "pending_invitation",
      },
      data: {
        onboardingStatus: "invited",
      },
    });
    if (update.count !== 1) {
      return null;
    }
    const invitation = await tx.restaurant_invitations.create({
      data: {
        userId: data.userId,
        tokenHash: data.tokenHash,
        expireAt: data.expireAt,
      },
      select: {
        id: true,
      },
    });
    return {
      owner,
      invitation,
    };
  });
}

// if the email cannot be sent

export async function rollbackRestaurantOwnerInvitation(
  invitationId: number,
  userId: number,
) {
  return prisma.$transaction(async (tx) => {
    await tx.restaurant_invitations.delete({
      where: {
        id: invitationId,
      },
    });

    await tx.customers.update({
      where: {
        id: userId,
        role: "restaurant_owner",
        onboardingStatus: "invited",
      },
      data: {
        onboardingStatus: "pending_invitation",
      },
    });
  });
}
