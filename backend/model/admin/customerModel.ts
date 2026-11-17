import { prisma } from "@/backend/lib/prisma";

export type CustomerStatus = "All" | "active" | "inactive";

export type CustomerSortBy = "newest" | "name";

type GetCustomersParams = {
  page: number;
  limit: number;
  search: string;
  status?: CustomerStatus;
  sortBy: CustomerSortBy;
};

// customer page table
export async function getAllCustomer({
  page,
  limit,
  search,
  status,
  sortBy,
}: GetCustomersParams) {
  const skip = (page - 1) * limit;
  const customers = await prisma.customers.findMany({
    where: {
      role: "customer",

      ...(status !== "All" && {
        status: status as "active" | "inactive",
      }),
      ...(search && {
        OR: [
          { username: { contains: search } },
          { email: { contains: search } },
        ],
      }),
    },
    skip: skip,
    take: limit,
    orderBy:
      sortBy === "name"
        ? { username: "asc" }
        : sortBy === "newest"
          ? { createdAt: "desc" }
          : { username: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      status: true,
      createdAt: true,
    },
  });

  const totalCustomers = await prisma.customers.count({
    where: {
      role: "customer",
      ...(status !== "All" && {
        status: status as "active" | "inactive",
      }),
      ...(search && {
        OR: [
          { username: { contains: search } },
          { email: { contains: search } },
        ],
      }),
    },
  });

  return {
    customers: customers.map((customer) => ({
      id: String(customer.id),
      name: customer.username,
      email: customer.email,
      orders: 0,
      totalSpend: 0,
      status: customer.status,
      joinDate: customer.createdAt.toISOString().split("T")[0],
    })),
    totalCustomers,
    totalPages: Math.ceil(totalCustomers / limit),
    currentPage: page,
  };
}

export async function updateCustomerStatus(
  id: number,
  status: "active" | "inactive",
) {
  const customer = await prisma.customers.update({
    where: {
      id: id,
      role: "customer",
    },
    data: {
      status: status,
    },
    select: {
      id: true,
      username: true,
      email: true,
      status: true,
    },
  });

  return customer;
}

//customerpage stats

export async function getCustomerStats() {
  const currentDate = new Date();

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const [totalCustomers, activeCustomers, inactiveCustomers, newCustomers] =
    await Promise.all([
      prisma.customers.count({
        where: { role: "customer" },
      }),
      prisma.customers.count({
        where: {
          role: "customer",
          status: "active",
        },
      }),
      prisma.customers.count({
        where: {
          role: "customer",
          status: "inactive",
        },
      }),
      prisma.customers.count({
        where: {
          role: "customer",
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);
  return {
    totalCustomers,
    activeCustomers,
    inactiveCustomers,
    newCustomers,
  };
}
