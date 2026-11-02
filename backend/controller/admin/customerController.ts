import {
  changeStatus,
  checkInActiveCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerByEmail,
} from "@/backend/model/admin/customerModel";
import type { CustomerStatus } from "@/backend/model/admin/customerModel";
import type { Request, Response } from "express";

export async function getCustomers(req: Request, res: Response) {
  try {
    const rows = await getAllCustomer();

    const customers = rows.map((customer) => ({
      ...customer,
      name: String(customer.name),
      email: String(customer.email),
      role: String(customer.role),
    }));

    return res.json(customers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
}

export async function getCustomerEmail(req: Request, res: Response) {
  try {
    const email = String(req.body.email);
    const result = await getCustomerByEmail(email);

    if (!result) {
      return res.status(404).json({
        message: "Customer Not Found",
      });
    }
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to Fetch Customer",
    });
  }
}

export async function removeCustomer(req: Request, res: Response) {
  try {
    const email = String(req.params.email);
    const result = await deleteCustomer(email);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Customer Not Found",
      });
    }

    return res.status(200).json({
      message: "Customer Removed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove customer",
    });
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    const email = String(req.params.email);
    const requestedStatus = req.params.status;

    if (
      !email ||
      (requestedStatus !== "active" && requestedStatus !== "inactive")
    ) {
      return res.status(400).json({
        message: "A valid email and status are required",
      });
    }
    const result = await changeStatus(requestedStatus as CustomerStatus, email);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Email Not Found",
      });
    }

    return res.status(200).json({
      message: "customer status updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update customer status",
    });
  }
}

export async function checkInActive(req: Request, res: Response) {
  try {
    const requestedStatus = req.params.status;

    if (requestedStatus !== "active" && requestedStatus !== "inactive") {
      return res.status(400).json({
        message: "A Valid status are required",
      });
    }

    const result = await checkInActiveCustomer(requestedStatus);
    if (!result) {
      return res.status(404).json({
        message: "status Not Found",
      });
    }

    return res.status(200).json({
      message: "customer status showed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Not able to show inactive customer",
    });
  }
}
