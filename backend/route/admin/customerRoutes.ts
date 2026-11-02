import {
  getCustomers,
  removeCustomer,
} from "@/backend/controller/admin/customerController";
import { Router } from "express";

const router = Router();

router.get("/", getCustomers);
router.delete("/:email", removeCustomer);

export default router;
