import mongoose from "mongoose";
import dotenv from "dotenv";
import Customer from "./src/models/Customer.js";
import connectDB from "./src/config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();

// const CustomerSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   passwordH

const seedCustomer = async () => {
  try {
    await connectDB();

    const existingCustomer = await Customer.findOne({
      email: "seeder@gmail.com",
    });
    if (existingCustomer) {
      console.log("Seeder customer already exists. Skipping seeding.");
      process.exit(0);
    }

    const passHash = await bcrypt.hash("superhardpass", 10);

    const customer = new Customer({
      firstName: "Seeder",
      lastName: "Customer",
      email: "seeder@gmail.com",
      phoneNumber: "1234567890",
      passwordHash: passHash,
    });
    customer.save();

    console.log("Seeded customer:", customer);
    process.exit();
  } catch (error) {
    console.error("Error seeding customer:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedCustomer();
