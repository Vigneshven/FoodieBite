import express from "express";
import cors from "cors";
import authRoutes from "@/backend/route/authRoutes";
import adminRoutes from "@/backend/route/admin/adminRoutes";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
