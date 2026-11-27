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
      onboardingStatus: true,
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
      onboardingStatus:
        role === "restaurant_owner" ? "pending_invitation" : "not_required",
    },
    select: {
      id: true,
    },
  });

  return customer.id;
}

export async function acceptRestaurantInvitationModel(tokenHash: string) {
  return prisma.$transaction(async (tx) => {
    const now = new Date();

    const invitation = await tx.restaurant_invitations.findUnique({
      where: {
        tokenHash,
      },
      select: {
        id: true,
        userId: true,
        acceptedAt: true,
        expireAt: true,
      },
    });
    if (!invitation || invitation.acceptedAt || invitation.expireAt <= now) {
      return null;
    }

    const accepted = await tx.restaurant_invitations.updateMany({
      where: {
        id: invitation.id,
        tokenHash,
        acceptedAt: null,
        expireAt: {
          gt: now,
        },
      },
      data: {
        acceptedAt: now,
      },
    });
    if (accepted.count !== 1) {
      return null;
    }
    const updateOwner = await tx.customers.updateMany({
      where: {
        id: invitation.userId,
        role: "restaurant_owner",
        status: "active",
        onboardingStatus: "invited",
      },
      data: {
        onboardingStatus: "profile_pending",
      },
    });
    if (updateOwner.count !== 1) {
      throw new Error("Restaurant owner is not eligible for onboarding");
    }
    return tx.customers.findUnique({
      where: {
        id: invitation.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        onboardingStatus: true,
      },
    });
  });
}

export async function findAdminId() {
  const admin = await prisma.customers.findFirst({
    where: {
      role: "admin",
      status: "active",
    },
    select: {
      id: true,
    },
  });

  return admin?.id ?? null;
}
