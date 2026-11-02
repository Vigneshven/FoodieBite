import {
  getCustomers,
  removeCustomer,
  updateStatus,
} from "@/backend/controller/admin/customerController";
import { Router } from "express";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/", getCustomers);
router.delete("/:email", removeCustomer);
router.put("/:email/:status", updateStatus);

export default router;
