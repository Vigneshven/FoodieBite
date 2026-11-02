import express from "express";
import cors from "cors";
import restaurantRoutes from "@/backend/route/admin/restaurantRoutes";
import authRoutes from "@/backend/route/authRoutes";
import adminRoutes from "@/backend/route/admin/adminRoutes";
import customersRoutes from "@/backend/route/admin/customerRoutes";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
