import {
  addRestaurant,
  changeRestaurantStatus,
  getRestaurant,
  getRestaurantStatistics,
} from "@/backend/controller/admin/restaurantController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { Router } from "express";

const router = Router();

// dashboard
router.get(
  "/stats",
  requireAuth,
  requireRole("admin"),
  getRestaurantStatistics,
);

// restaurant page
router.get("/", requireAuth, requireRole("admin"), getRestaurant);
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  changeRestaurantStatus,
);

// restaurant page add form
router.post("/", requireAuth, requireRole("admin"), addRestaurant);

export default router;
