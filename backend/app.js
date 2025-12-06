const express = require("express");
const connectDB = require("./src/config/db.js");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const bookingRoutes = require("./src/routes/bookingRoutes");
const customerRoutes = require("./src/routes/customerRoutes");

app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server running in ${process.env.NODE_ENV} mode on port ${PORT}'));
