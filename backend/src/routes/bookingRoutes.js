import { Router } from "express";
import { mockAuth } from "../middleware/mockAuth.js";
import {
  createBooking,
  getCustomerBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Apply mock authentication middleware to all booking routes
// router.use(mockAuth);

router.post("/", protect, createBooking);
router.get("/customer/:customerId", protect, getCustomerBookings);
router.put("/:bookingId", protect, updateBooking);
router.delete("/:bookingId", protect, deleteBooking);

export default router;
