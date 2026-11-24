import {
  addRestaurant,
  changeRestaurantStatus,
  getRestaurant,
  getRestaurantOwnerRequests,
  getRestaurantStatistics,
  sendRestaurantOwnerInvitation,
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

// pending restaurant owner requests
router.get(
  "/owner-requests",
  requireAuth,
  requireRole("admin"),
  getRestaurantOwnerRequests,
);

// sending invitation to restaurant owner
router.post(
  "/owner-requests/:userId/invite",
  requireAuth,
  requireRole("admin"),
  sendRestaurantOwnerInvitation,
);

export default router;
