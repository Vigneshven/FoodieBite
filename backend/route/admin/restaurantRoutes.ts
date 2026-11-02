import { Router } from "express";
import {
  addRestaurantTo,
  getRestaurant,
  getRestaurants,
  removeRestaurant,
} from "@/backend/controller/admin/restaurantController";

const router = Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", addRestaurantTo);
router.delete("/:name", removeRestaurant);

export default router;
