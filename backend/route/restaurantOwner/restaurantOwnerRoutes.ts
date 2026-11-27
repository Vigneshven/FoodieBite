import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "@/backend/controller/restaurantOwner/restaurantController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { restaurantUpload } from "@/backend/middleware/restaurantUploads";
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
  restaurantUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  updateMyRestaurant,
);

router.post(
  "/restaurant",
  requireAuth,
  requireRole("restaurant_owner"),
  restaurantUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createMyRestaurant,
);

export default router;
