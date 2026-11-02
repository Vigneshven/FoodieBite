import type { Request, Response } from "express";
import {
  createCustomer,
  findCustomerByEmail,
} from "@/backend/model/admin/authModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  try {
    const { username, email, password, role } = req.body;

    const allowedRoles = ["customer", "restaurant_owner", "delivery_partner"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid Account Role",
      });
    }

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

    await createCustomer(username, email, passwordHash, role);

    return res.status(201).json({
      message: "Registeration Successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Registration Failed",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and Password is invalid",
      });
    }

    const user = await findCustomerByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "invalid email and password ",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "invalid email and password",
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Your account is suspended. Please contact an admin.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "Authentication config error",
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn: "1hr",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successfully",
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
}
