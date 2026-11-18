import {
  getMyRestaurant,
  updateMyRestaurant,
} from "@/backend/controller/restaurantOwner/restaurantController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { Router } from "express";

const router = Router();

router.get(
  "/restaurant",
  requireAuth,
  requireRole("restaurant_owner"),
  getMyRestaurant,
);

router.patch(
  "/restaurant",
  requireAuth,
  requireRole("restaurant_owner"),
  updateMyRestaurant,
);

export default router;
