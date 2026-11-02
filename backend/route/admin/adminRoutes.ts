import { Router } from "express";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), (req, res) => {
  return res.status(200).json({
    message: "Admin access granted",
    id: req.id,
    role: req.userRole,
  });
});

export default router;
