import { Request, Response } from "express";
import {
  createRestaurant,
  findRestaurantByName,
  findRestaurantByPhone,
  getAllRestaurants,
  getRestaurantStats,
  RestaurantSortOptions,
  RestaurantStatusFilter,
  updateRestaurantStatus,
} from "@/backend/model/admin/restaurantModel";

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
    const { name, email, phone, cuisine } = req.body;

    if (!name || !email || !phone || !cuisine) {
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

    const restaurant = await createRestaurant({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category: cuisine.trim(),
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      data: {
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.category,
        rating: restaurant.rating,
        status: restaurant.status,
        contact: restaurant.phone,
        joinDate: restaurant.createdAt.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add restaurant",
    });
  }
};
