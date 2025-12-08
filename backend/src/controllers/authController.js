import { asyncHandler } from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import Customer from "../models/Customer.js";
import { generateToken } from "../utils/generateToken.js";
import { request } from "express";

export const signup = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword, ...rest } = req.body;

  if (!email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Email and password, and confirmPassword are required");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const userExists = await Customer.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  // console.log("Creating user with email:", email);
  const passHash = await bcrypt.hash(password, 10);
  const customer = await Customer.create({
    email,
    passwordHash: passHash,
    ...rest,
  });

  const customerData = customer.toObject();
  customerData.id = customerData._id;
  delete customerData.__v;
  delete customerData._id;
  delete customerData.passwordHash;

  res.status(201).json({
    user: customerData,
    token: generateToken({ id: customer._id }),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, customer.passwordHash);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const customerData = customer.toObject();
  customerData.id = customerData._id;
  delete customerData.__v;
  delete customerData._id;
  delete customerData.passwordHash;

  res.status(200).json({
    user: customerData,
    token: generateToken({ id: customer._id }),
  });
});

export const getUser = asyncHandler(async (request, response) => {
  const customer = await Customer.findById(request.user.id).select("-passwordHash -__v");

  if(!customer) {
    response.status(404);
    throw new Error("User not found");
  }

  response.json({ user: customer });
})