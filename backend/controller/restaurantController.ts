import type { Request, Response } from "express";
import {
  addRestaurant,
  checkRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantById,
} from "../model/restaurantModel";

export async function getRestaurants(req: Request, res: Response) {
  try {
    const rows = await getAllRestaurants();

    const restaurants = rows.map((restaurant) => ({
      ...restaurant,
      name: String(restaurant.name),
      category: String(restaurant.category),
    }));

    return res.json(restaurants);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed to fetch restaurants",
    });
  }
}

export async function getRestaurant(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = Number(req.params.id);
    const restaurant = await getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    return res.json(restaurant);
  } catch {
    return res.status(500).json({
      message: "Failed to fetch restaurant",
    });
  }
}

export async function addRestaurantTo(req: Request, res: Response) {
  try {
    const { name, image, category } = req.body;

    if (
      !name.trim() ||
      typeof name !== "string" ||
      !image.trim() ||
      typeof image !== "string" ||
      !category.trim() ||
      typeof category !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid restaurant details",
      });
    }

    const isPresent = await checkRestaurant({
      name: name.trim(),
      image: image.trim(),
      category: category.trim(),
    });

    if (isPresent) {
      return res.status(409).json({
        message: "Restaurant is Already Added",
      });
    }

    await addRestaurant({
      name: name.trim(),
      image: image.trim(),
      category: category.trim(),
    });
    return res.status(200).json({
      message: "Restaurant Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add restaurant",
    });
  }
}

export async function removeRestaurant(req: Request, res: Response) {
  try {
    const name = String(req.params.name);
    const result = await deleteRestaurant(name);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Restaurant Not Found",
      });
    }

    return res.status(200).json({
      message: "Restaurant Removed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove restaurant",
    });
  }
}
