import {
  changeCustomerStatus,
  getCustomers,
  getCustomerStatistics,
} from "@/backend/controller/admin/customerController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { Router } from "express";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), getCustomers);

router.patch(
  "/:id/status",
  requireAuth,
  requireRole("admin"),
  changeCustomerStatus,
);

router.get("/stats", requireAuth, requireRole("admin"), getCustomerStatistics);

export default router;
