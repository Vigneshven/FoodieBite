import { Router } from "express";
import { login, register } from "../controller/authController";
import { requireAuth } from "../middleware/requireAuth";
import { findCustomerById } from "../model/authModel";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", requireAuth, async (req, res) => {
  const user = await findCustomerById(req.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
