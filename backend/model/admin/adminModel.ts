import { prisma } from "@/backend/lib/prisma";

export const getAdminDashboardStats = async () => {
  const [totalCustomers, totalRestaurants] = await Promise.all([
    prisma.customers.count({
      where: {
        role: "customer",
      },
    }),
    prisma.restaurants.count(),
  ]);
  return {
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers,
    totalRestaurants,
  };
};