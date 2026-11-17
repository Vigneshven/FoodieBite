import { Router } from "express";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { requireRole } from "@/backend/middleware/requireRole";
import { getDashboardStats } from "@/backend/controller/admin/adminController";
import customerRoutes from "../admin/customerRoutes";
import restaurantRoutes from "../admin/restaurantRoutes";

const router = Router();

router.get("/", requireAuth, requireRole("admin"), (req, res) => {
  return res.status(200).json({
    message: "Admin access granted",
    id: req.id,
    role: req.userRole,
  });
});

router.get(
  "/dashboard/stats",
  requireAuth,
  requireRole("admin"),
  getDashboardStats,
);

router.use("/customers", customerRoutes);
router.use("/restaurants", restaurantRoutes);

export default router;
