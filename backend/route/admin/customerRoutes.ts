import { getCustomers } from "@/backend/controller/admin/customerController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { Router } from "express";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), getCustomers);

export default router;
