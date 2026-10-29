import express from "express";
import cors from "cors";
import restaurantRoutes from "../backend/route/restaurantRoutes";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({origin:"http://localhost:3000"}));

app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/customer");
// app.use("/api/order");
// app.use("/api/partners");

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
