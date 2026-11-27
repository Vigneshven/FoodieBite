import "./config/env";
import express from "express";
import cors from "cors";
import authRoutes from "@/backend/route/authRoutes";
import adminRoutes from "@/backend/route/admin/adminRoutes";
import restaurantOwnerRoutes from "@/backend/route/restaurantOwner/restaurantOwnerRoutes";
import notificationRoutes from "@/backend/route/notification/notificationRoutes";
import path from "node:path";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
// for admin
app.use("/api/admin", adminRoutes);

// for restaurant_owner
app.use("/api/restaurant-owner", restaurantOwnerRoutes);

// for notification
app.use("/api/notifications", notificationRoutes);

// file uploads
app.use("/uploads", express.static("public/uploads"));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
