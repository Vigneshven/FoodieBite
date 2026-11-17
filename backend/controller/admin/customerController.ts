import {
  CustomerSortBy,
  CustomerStatus,
  getAllCustomer,
  getCustomerStats,
  updateCustomerStatus,
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
      sortByValue === "name" || sortByValue === "newest"
        ? sortByValue
        : "newest";

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

export const changeCustomerStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    if (status !== "active" && status !== "inactive") {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const customer = await updateCustomerStatus(id, status);

    return res.status(200).json({
      message: "Customer status updated successfully",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update customer status",
    });
  }
};

export const getCustomerStatistics = async (req: Request, res: Response) => {
  try {
    const stats = await getCustomerStats();

    return res.status(200).json({
      message: "Customer Stats fetched Successfully",
      data: stats,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch customer stats",
    });
  }
};
