import { findRestaurantByPhone } from "@/backend/model/admin/restaurantModel";
import {
  getRestaurantByOwnerEmail,
  updateRestaurantByOwnerEmail,
} from "@/backend/model/restaurantOwner/restaurantModel";
import { Prisma } from "@/backend/prisma/generated/prisma/client";
import { Request, Response } from "express";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const email = req.currentUser?.email;
    if (!email) {
      return res.status(404).json({
        message: "Owner email not found",
      });
    }

    const restaurant = await getRestaurantByOwnerEmail(email);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({
      message: "restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch restaurant",
    });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const email = req.currentUser?.email;
    if (!email) {
      return res.status(401).json({
        message: "Owner not authenticated",
      });
    }

    const currentRestaurant = await getRestaurantByOwnerEmail(email);

    if (!currentRestaurant) {
      return res.status(404).json({
        message: "Restaurant Not found",
      });
    }

    const {
      name,
      description,
      restaurantType,
      cuisines,
      category,
      phone,
      streetAddress,
      landmark,
      city,
      state,
      postalCode,
      country,
      logo,
      image,
      openingHours,
    } = req.body;

    if (phone !== undefined && phone !== currentRestaurant.phone) {
      const existingRestaurant = await findRestaurantByPhone(phone);
      if (existingRestaurant) {
        return res.status(409).json({
          message: "Phone already exists",
        });
      }
    }

    const Fields = {
      name,
      description,
      restaurantType,
      cuisines,
      category,
      phone,
      streetAddress,
      landmark,
      city,
      state,
      postalCode,
      country,
      logo,
      image,
    };

    const hasFields = Object.values(Fields).some(
      (value) => value !== undefined,
    );

    if (!hasFields && openingHours === undefined) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    for (const [field, value] of Object.entries(Fields)) {
      if (value !== undefined && typeof value !== "string") {
        return res.status(400).json({
          message: `Provide the valid ${field}`,
        });
      }
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: "Restaurant name is required",
      });
    }

    if (
      openingHours !== undefined &&
      (openingHours === null ||
        typeof openingHours !== "object" ||
        Array.isArray(openingHours))
    ) {
      return res.status(400).json({
        message: "Invalid opening hours",
      });
    }

    const updatedRestaurant = await updateRestaurantByOwnerEmail(email, {
      ...(name !== undefined && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(restaurantType !== undefined && {
        restaurantType: restaurantType.trim(),
      }),
      ...(cuisines !== undefined && { cuisines: cuisines.trim() }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(streetAddress !== undefined && {
        streetAddress: streetAddress.trim(),
      }),
      ...(landmark !== undefined && { landmark: landmark.trim() }),
      ...(city !== undefined && { city: city.trim() }),
      ...(state !== undefined && { state: state.trim() }),
      ...(postalCode !== undefined && { postalCode: postalCode.trim() }),
      ...(country !== undefined && { country: country.trim() }),
      ...(logo !== undefined && { logo: logo.trim() }),
      ...(category !== undefined && { category: category.trim() }),
      ...(image !== undefined && { image: image.trim() }),
      ...(openingHours !== undefined && {
        openingHours: openingHours as Prisma.InputJsonValue,
      }),
    });

    if (!updatedRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      message: "Restaurant details updated succcessfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update restaurant details",
    });
  }
};
