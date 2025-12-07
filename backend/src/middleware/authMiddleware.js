import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

export const protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ message: "Not Authorized. No token" });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Customer.findById(decoded.id).select("-passwordHash");
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(401);
    throw new Error("Not Authorized. Invalid token");
  }
};
