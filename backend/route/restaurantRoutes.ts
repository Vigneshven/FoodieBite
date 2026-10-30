import { Router } from "express";
import {
  addRestaurantTo,
  getRestaurant,
  getRestaurants,
  removeRestaurant,
} from "../controller/restaurantController";

const router = Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", addRestaurantTo);
router.delete("/:name", removeRestaurant);

export default router;
