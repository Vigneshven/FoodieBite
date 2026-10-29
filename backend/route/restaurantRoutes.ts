import { Router } from "express";
import { getRestaurants } from "../controller/restaurantController";

const router = Router();

router.get("/", getRestaurants);

export default router;
