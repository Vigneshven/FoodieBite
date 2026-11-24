import type { Request, Response } from "express";
import {
  acceptRestaurantInvitationModel,
  createCustomer,
  findCustomerByEmail,
} from "@/backend/model/authModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { hashInvitationToken } from "../utils/invitationToken";

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

export async function acceptRestaurantInvitation(req: Request, res: Response) {
  try {
    const { token } = req.body;

    if (typeof token !== "string") {
      return errorResponse(res, {
        message: "Invalid token invitation",
        statusCode: 400,
      });
    }

    const tokenHash = hashInvitationToken(token);
    const owner = await acceptRestaurantInvitationModel(tokenHash);

    if (!owner) {
      return errorResponse(res, {
        message: "Invalid or expired invitation token",
        statusCode: 400,
      });
    }
    return successResponse(res, {
      message: "Restaurant invitation accepted successfully",
      data: {
        id: owner.id,
        username: owner.username,
        email: owner.email,
        role: owner.role,
        onboardingStatus: owner.onboardingStatus,
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, {
      message: "Failed to accept restaurant invitation",
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

    if (user.mustChangePassword) {
      return res.status(200).json({
        message: "Change your temporary password",
        role: user.role,
        mustChangePassword: true,
      });
    }

    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Your account is suspended. Please contact an admin.",
      });
    }

    if (
      user.role === "restaurant_owner" &&
      ["pending_invitations", "invited"].includes(user.onboardingStatus)
    ) {
      return errorResponse(res, {
        message:
          "Please accept your restaurant owner invitation before logging in.",
        statusCode: 403,
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
      mustChagePassword: user.mustChangePassword,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
}
