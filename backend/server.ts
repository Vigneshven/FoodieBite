import "./config/env";
import express from "express";
import cors from "cors";
import authRoutes from "@/backend/route/authRoutes";
import adminRoutes from "@/backend/route/admin/adminRoutes";
import restaurantOwnerRoutes from "@/backend/route/restaurantOwner/restaurantOwnerRoutes";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
// for admin
app.use("/api/admin", adminRoutes);

// for restaurant_owner
app.use("/api/restaurant-owner", restaurantOwnerRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
