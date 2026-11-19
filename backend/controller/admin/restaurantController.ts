import { Request, Response } from "express";
import {
  createRestaurantWithOwner,
  findRestaurantByName,
  findRestaurantByPhone,
  getAllRestaurants,
  getRestaurantStats,
  RestaurantSortOptions,
  RestaurantStatusFilter,
  updateRestaurantStatus,
} from "@/backend/model/admin/restaurantModel";
import { findCustomerByEmail } from "@/backend/model/authModel";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function getRestaurantStatistics(req: Request, res: Response) {
  try {
    const stats = await getRestaurantStats();
    return res.status(200).json({
      message: "fetched restaurant stats successfully",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch restaurant stats",
    });
  }
}

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = String(req.query.search);
    const statusValue = String(req.query.status || "All");
    const status: RestaurantStatusFilter =
      statusValue === "active" ||
      statusValue === "pending" ||
      statusValue === "suspended"
        ? statusValue
        : "All";
    const sortByValue = String(req.query.sortBy || "newest");
    const sortBy: RestaurantSortOptions =
      sortByValue === "newest" ||
      sortByValue === "name" ||
      sortByValue === "highest-rating"
        ? sortByValue
        : "newest";

    const result = await getAllRestaurants({
      page,
      limit,
      search,
      status,
      sortBy,
    });

    return res.status(200).json({
      message: "Restaurant Fetch successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch restaurants",
    });
  }
};

export const changeRestaurantStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }

    if (!["active", "pending", "suspended"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const restaurant = await updateRestaurantStatus(id, status);

    return res.status(200).json({
      message: "Restaurant status updated successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update restaurant status",
    });
  }
};

// adding restaurant

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    const restaurantName = name.trim();
    const existingRestaurant = await findRestaurantByName(restaurantName);
    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant Already Exist",
      });
    }

    const restaurantPhone = phone.trim();
    const existingRestaurantPhone =
      await findRestaurantByPhone(restaurantPhone);

    if (existingRestaurantPhone) {
      return res.status(409).json({
        message: "Phone Already Exist",
      });
    }
    const existingCustomer = await findCustomerByEmail(email);

    if (existingCustomer) {
      return res.status(409).json({
        message: "Account with this owner email already exists",
      });
    }

    const tempPassword = crypto
      .randomInt(0, 1000000)
      .toString()
      .padStart(8, "0");

    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const result = await createRestaurantWithOwner({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      passwordHash,
    });

    return res.status(201).json({
      message: "Restaurant and owner account  created successfully",
      data: {
        id: result.restaurant.id,
        name: result.restaurant.name,
        cuisine: result.restaurant.category,
        rating: result.restaurant.rating,
        status: result.restaurant.status,
        contact: result.restaurant.phone,
        joinDate: result.restaurant.createdAt.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add restaurant",
    });
  }
};
