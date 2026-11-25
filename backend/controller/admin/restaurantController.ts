import { Request, Response } from "express";
import {
  createRestaurantOwnerInvitation,
  createRestaurantWithOwner,
  findRestaurantByName,
  findRestaurantByPhone,
  getAllRestaurants,
  getPendingRestauranOwnerRequest,
  getRestaurantStats,
  RestaurantSortOptions,
  RestaurantStatusFilter,
  rollbackRestaurantOwnerInvitation,
  updateRestaurantStatus,
} from "@/backend/model/admin/restaurantModel";
import { findCustomerByEmail } from "@/backend/model/authModel";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { errorResponse, successResponse } from "@/backend/utils/api/apiResponse";
import { generateInvitationToken } from "@/backend/utils/email/invitationToken";
import { sendEmail } from "@/backend/utils/email/email";

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

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = String(req.query.search);
    const statusValue = String(req.query.status || "All");
    const status: RestaurantStatusFilter =
      statusValue === "active" ||
      statusValue === "pending" ||
      statusValue === "suspended"
        ? statusValue
        : "All";
    const sortByValue = String(req.query.sortBy || "newest");
    const sortBy: RestaurantSortOptions =
      sortByValue === "newest" ||
      sortByValue === "name" ||
      sortByValue === "highest-rating"
        ? sortByValue
        : "newest";

    const result = await getAllRestaurants({
      page,
      limit,
      search,
      status,
      sortBy,
    });

    return res.status(200).json({
      message: "Restaurant Fetch successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch restaurants",
    });
  }
};

export const changeRestaurantStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid restaurant ID",
      });
    }

    if (!["active", "pending", "suspended"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const restaurant = await updateRestaurantStatus(id, status);

    return res.status(200).json({
      message: "Restaurant status updated successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update restaurant status",
    });
  }
};

// adding restaurant

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    const restaurantName = name.trim();
    const existingRestaurant = await findRestaurantByName(restaurantName);
    if (existingRestaurant) {
      return res.status(409).json({
        message: "Restaurant Already Exist",
      });
    }

    const restaurantPhone = phone.trim();
    const existingRestaurantPhone =
      await findRestaurantByPhone(restaurantPhone);

    if (existingRestaurantPhone) {
      return res.status(409).json({
        message: "Phone Already Exist",
      });
    }
    const existingCustomer = await findCustomerByEmail(email);

    if (existingCustomer) {
      return res.status(409).json({
        message: "Account with this owner email already exists",
      });
    }

    const tempPassword = crypto
      .randomInt(0, 1000000)
      .toString()
      .padStart(8, "0");

    const passwordHash = await bcrypt.hash(tempPassword, 12);

    const result = await createRestaurantWithOwner({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      passwordHash,
    });

    return res.status(201).json({
      message: "Restaurant and owner account  created successfully",
      data: {
        id: result.restaurant.id,
        name: result.restaurant.name,
        cuisine: result.restaurant.category,
        rating: result.restaurant.rating,
        status: result.restaurant.status,
        contact: result.restaurant.phone,
        joinDate: result.restaurant.createdAt.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to add restaurant",
    });
  }
};

export const getRestaurantOwnerRequests = async (
  req: Request,
  res: Response,
) => {
  try {
    const requests = await getPendingRestauranOwnerRequest();
    return successResponse(res, {
      message: "Restaurant owner request fetch successfully",
      statusCode: 200,
      data: requests,
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, {
      message: "Failed to fetch restaurant owner requests",
      statusCode: 500,
    });
  }
};

// for creating invitation link

export const sendRestaurantOwnerInvitation = async (
  req: Request,
  res: Response,
) => {
  let createInvitation: {
    owner: { id: number; username: string; email: string };
    invitation: {
      id: number;
    };
  } | null;
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return errorResponse(res, {
        message: "Invalid restaurant owner ID",
        statusCode: 400,
      });
    }

    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl) {
      return errorResponse(res, {
        message: "Frontend url is not config",
        statusCode: 500,
      });
    }

    const { token, tokenHash } = generateInvitationToken();

    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    createInvitation = await createRestaurantOwnerInvitation({
      userId,
      tokenHash,
      expireAt,
    });

    if (!createInvitation) {
      return errorResponse(res, {
        message: "Restaurant Owner invitation not found or already sent",
        statusCode: 409,
      });
    }

    const invitationLink = `${frontendUrl}/restaurant/invitation/accept?token=${token}`;

    try {
      await sendEmail({
        to: createInvitation.owner.email,
        subject: "You are invited to join FoodieBite as an Restaurant Owner",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Welcome to FoodieBite</h2>
        <p>Hello ${createInvitation.owner.username}</p>
        <p>Your request to become a FoodieBite Restaurant Owner has been received</p>
        <p>Your are invited to continue your restaurant onboarding</p>
        <a href="${invitationLink}" style="display: inline-block;padding: 12px 24px;background-color: #16a34a;
                color: white;
                text-decoration: none;
                border-radius: 6px;
              ">Accept Invitation</a>

        <p>This invitation expires in 24 hours.</p>
        <p>If you did not request this invitation, you can ignore this email.</p>
        <p>FoodieBite Team</p>
        </div>
        `,
      });
    } catch (error) {
      console.log(error);
      try {
        await rollbackRestaurantOwnerInvitation(
          createInvitation.invitation.id,
          userId,
        );
      } catch (error) {
        console.log(error);
      }
      return errorResponse(res, {
        message: "Failed to send invitation email",
        statusCode: 500,
      });
    }
    return successResponse(res, {
      message: "Restaurant owner invitation sent successfully",
      statusCode: 200,
      data: {
        userId: createInvitation.owner.id,
        email: createInvitation.owner.email,
        onboardingStatus: "invited",
        expireAt,
      },
    });
  } catch (error) {
    console.log(error);
    return errorResponse(res, {
      message: "Failed to send restaurant owner invitation",
      statusCode: 500,
    });
  }
};
