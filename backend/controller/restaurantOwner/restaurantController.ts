import { findRestaurantByPhone } from "@/backend/model/admin/restaurantModel";
import { findAdminId } from "@/backend/model/authModel";
import {
  createRestaurantForOwner,
  getRestaurantByOwnerEmail,
  updateRestaurantByOwnerEmail,
} from "@/backend/model/restaurantOwner/restaurantModel";
import { CreateRestaurantData } from "@/backend/model/restaurantOwner/types/types";
import { Prisma } from "@/backend/prisma/generated/prisma/client";
import { enqueueNotification } from "@/backend/queues/producer/notificationProducer";
import {
  errorResponse,
  successResponse,
} from "@/backend/utils/api/apiResponse";
import { Request, Response } from "express";

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const ownerId = req.currentUser?.id;

    if (!ownerId) {
      return errorResponse(res, {
        message: "Owner not authenticated",
        statusCode: 401,
      });
    }

    const files = (req.files ?? {}) as {
      logo?: Express.Multer.File[];
      image?: Express.Multer.File[];
    };

    const logoFile = files.logo?.[0];
    const imageFile = files.image?.[0];

    if (!logoFile || !imageFile) {
      return errorResponse(res, {
        message: "Restaurant logo and image are required",
        statusCode: 400,
      });
    }

    const {
      name,
      description,
      restaurantType,
      cuisines,
      category,
      phone,
      email,
      streetAddress,
      landmark,
      city,
      state,
      postalCode,
      country,
      openingHours,
    } = req.body;

    const requiredFields = {
      name,
      restaurantType,
      category,
      phone,
      email,
      streetAddress,
      city,
      state,
      postalCode,
      country,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== "string" || !value.trim()) {
        return errorResponse(res, {
          message: `${field} is required`,
          statusCode: 400,
        });
      }
    }

    if (description !== undefined && typeof description !== "string") {
      return errorResponse(res, {
        message: "Invalid description",
        statusCode: 400,
      });
    }

    if (cuisines !== undefined && typeof cuisines !== "string") {
      return errorResponse(res, {
        message: "Invalid cuisines",
        statusCode: 400,
      });
    }

    if (landmark !== undefined && typeof landmark !== "string") {
      return errorResponse(res, {
        message: "Invalid landmark",
        statusCode: 400,
      });
    }

    let parsedOpeningHours: Prisma.InputJsonValue;

    try {
      if (typeof openingHours !== "string") {
        throw new Error("Invalid opening hours");
      }

      parsedOpeningHours = JSON.parse(openingHours) as Prisma.InputJsonValue;
    } catch (error) {
      console.log(error);
      return errorResponse(res, {
        message: "Invalid openingHours",
        statusCode: 400,
      });
    }

    if (!Array.isArray(parsedOpeningHours) || parsedOpeningHours.length !== 7) {
      return errorResponse(res, {
        message: "Opening hours must contain 7 days",
        statusCode: 400,
      });
    }

    const existingPhone = await findRestaurantByPhone(phone.trim());

    if (existingPhone) {
      return errorResponse(res, {
        message: "Phone already exist",
        statusCode: 409,
      });
    }

    const restaurantData: CreateRestaurantData = {
      name: name.trim(),
      description: description?.trim() ?? "",
      restaurantType: restaurantType.trim(),
      cuisines: cuisines?.trim() ?? "",
      category: category.trim(),
      phone: phone.trim(),
      email: email.trim(),
      streetAddress: streetAddress.trim(),
      landmark: landmark?.trim() ?? "",
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim(),
      country: country.trim(),
      logo: `/uploads/restaurants/logo/${logoFile.filename}`,
      image: `/uploads/restaurants/image/${imageFile.filename}`,
      openingHours: parsedOpeningHours,
    };

    const restaurant = await createRestaurantForOwner(ownerId, restaurantData);

    try {
      const adminId = await findAdminId();
      if (adminId !== null) {
        await enqueueNotification({
          recipientId: adminId,
          title: "New Restaurant Profile Submitted",
          message: `${restaurant.name} has submitted its restaurant profile and is waiting for your review`,
          type: "restaurant_profile_submitted",
        });
      } else {
        console.log("No admin found for restuarant profile notification");
      }
    } catch (error) {
      console.log(error);
    }

    return successResponse(res, {
      message: "Restaurant Profile submmitted successfully",
      statusCode: 201,
      data: restaurant,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "RESTAURANT_ALREADY_EXISTS") {
        return res.status(409).json({
          message: "You already have a restaurant profile",
        });
      }

      if (error.message === "INVALID_ONBOARDING_STATUS") {
        return res.status(403).json({
          message: "You are not allowed to submit your profile at this stage",
        });
      }

      if (error.message === "RESTAURANT_OWNER_NOT_FOUND") {
        return res.status(404).json({
          message: "Restaurant owner not found",
        });
      }
    }

    return errorResponse(res, {
      message: "Failed to submit restaurant profile",
      statusCode: 500,
    });
  }
};

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
      return res.status(200).json({
        message: "Restaurant profile not created yet",
        data: null,
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

    const files = (req.files ?? {}) as {
      logo?: Express.Multer.File[];
      image?: Express.Multer.File[];
    };

    const logoFile = files.logo?.[0];
    const imageFile = files.image?.[0];

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
    };

    const hasFields = Object.values(Fields).some(
      (value) => value !== undefined,
    );

    const hasFiles = Boolean(logoFile || imageFile);

    if (!hasFields && openingHours === undefined && !hasFiles) {
      return errorResponse(res, {
        message: "Provide at least one field to update",
        statusCode: 400,
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

    let parsedOpeningHours: Prisma.InputJsonValue | undefined;

    if (openingHours !== undefined) {
      try {
        if (typeof openingHours !== "string") {
          throw new Error("Invalid opening hours");
        }

        parsedOpeningHours = JSON.parse(openingHours) as Prisma.InputJsonValue;
      } catch {
        return errorResponse(res, {
          message: "Invalid opening hours",
          statusCode: 400,
        });
      }

      if (
        !Array.isArray(parsedOpeningHours) ||
        parsedOpeningHours.length !== 7
      ) {
        return errorResponse(res, {
          message: "Opening hours must contain 7 days",
          statusCode: 400,
        });
      }
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
      ...(logoFile && {
        logo: `/uploads/restaurants/${logoFile.filename}`,
      }),
      ...(category !== undefined && { category: category.trim() }),
      ...(imageFile && {
        image: `/uploads/restaurants/${imageFile.filename}`,
      }),
      ...(openingHours !== undefined && { openingHours: parsedOpeningHours }),
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
