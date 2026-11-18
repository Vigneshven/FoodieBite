import { Prisma } from "@/backend/prisma/generated/prisma/client";

export type UpdateRestaurantData = {
  name?: string;
  description?: string;
  restaurantType?: string;
  cuisines?: string;
  phone?: string;
  streetAddress?: string;
  landmark?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  logo?: string;
  image?: string;
  openingHours?: Prisma.InputJsonValue;
};
