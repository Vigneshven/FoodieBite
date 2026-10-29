import type { Request, Response } from "express";
import { getAllRestaurants } from "../model/restaurantModel";

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
