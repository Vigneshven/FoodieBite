import { prisma } from "@/backend/lib/prisma";

export type UserRole =
  | "customer"
  | "restaurant_owner"
  | "delivery_partner"
  | "admin";
export type UserStatus = "active" | "inactive";

export async function findCustomerByEmail(email: string) {
  return await prisma.customers.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
      status: true,
      mustChangePassword: true,
    },
  });
}

export async function findCustomerById(id: number) {
  return await prisma.customers.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updatePasswordByHash(
  id: number,
  password: string,
): Promise<void> {
  await prisma.customers.update({
    where: {
      id: id,
    },
    data: {
      password: password,
    },
  });
}

export async function createCustomer(
  username: string,
  email: string,
  passwordHash: string,
  role: Exclude<UserRole, "admin">,
) {
  const customer = await prisma.customers.create({
    data: {
      username,
      email,
      password: passwordHash,
      role,
    },
    select: {
      id: true,
    },
  });

  return customer.id;
}
