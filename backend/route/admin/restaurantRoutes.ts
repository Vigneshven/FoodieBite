import { Router } from "express";
import {
  addRestaurantTo,
  getRestaurant,
  getRestaurants,
  removeRestaurant,
} from "@/backend/controller/admin/restaurantController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", addRestaurantTo);
router.delete("/:name", removeRestaurant);

export default router;
