import {
  changeRestaurantStatus,
  getRestaurant,
  getRestaurantStatistics,
} from "@/backend/controller/admin/restaurantController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { Router } from "express";

const router = Router();

router.get(
  "/stats",
  requireAuth,
  requireRole("admin"),
  getRestaurantStatistics,
);

router.get("/", requireAuth, requireRole("admin"), getRestaurant);

router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  changeRestaurantStatus,
);

export default router;
