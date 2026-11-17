import {
  CustomerSortBy,
  CustomerStatus,
  getAllCustomer,
} from "@/backend/model/admin/customerModel";
import type { Request, Response } from "express";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = String(req.query.search);
    const statusValue = String(req.query.status || "All");
    const status: CustomerStatus =
      statusValue === "active" || statusValue === "inactive"
        ? statusValue
        : "All";
    const sortByValue = String(req.query.sortBy || "newest");
    const sortBy: CustomerSortBy =
      sortByValue === "name" || sortByValue === "newest" ? sortByValue : "newest";

    const result = await getAllCustomer({
      page,
      limit,
      search,
      status,
      sortBy,
    });

    return res.status(200).json({
      message: "Customer Fetch successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch customer",
    });
  }
};
