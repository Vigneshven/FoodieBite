import { Request, Response } from "express";
import { getRestaurantStats } from "@/backend/model/admin/restaurantModel";

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
