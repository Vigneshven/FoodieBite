import { getAdminDashboardStats } from "@/backend/model/admin/adminModel";
import type { Request, Response } from "express";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminDashboardStats();

    return res.status(200).json({
      message: "Dashboard stats fetch successfully",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Fetch the dashboard stats",
    });
  }
};
