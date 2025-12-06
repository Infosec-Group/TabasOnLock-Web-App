import express, { json } from "express";
import connectDB from "./src/config/db.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import { config } from "dotenv";

config();

connectDB();

const app = express();

app.use(json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
