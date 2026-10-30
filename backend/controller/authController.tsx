import type { Request, Response } from "express";
import { createCustomer, findCustomerByEmail } from "../model/authModel";
import bcrypt from "bcryptjs";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    if (
      typeof username !== "string" ||
      !username ||
      typeof email !== "string" ||
      !email ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "All Field are required",
      });
    }

    if (password.length < 8) {
      return res.status(409).json({
        message: "Password must be at least 8 character",
      });
    }

    const existmail = await findCustomerByEmail(email);

    if (existmail) {
      return res.status(409).json({
        message: "Email Already Exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await createCustomer(username, email, passwordHash);

    return res.status(201).json({
      message: "Registeration Successfull",
    });
  } catch {
    return res.status(500).json({
      message: "Registration Failed",
    });
  }
}
