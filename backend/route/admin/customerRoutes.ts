import {
  getCustomers,
  removeCustomer,
  updateStatus,
} from "@/backend/controller/admin/customerController";
import { Router } from "express";

const router = Router();

router.get("/", getCustomers);
router.delete("/:email", removeCustomer);
router.put("/:email/:status", updateStatus);

export default router;
