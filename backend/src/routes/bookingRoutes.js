import { Router } from "express";
import {
  createBooking,
  getCustomerBookings,
  deleteBooking,
  cancelBooking,
  rescheduleBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Apply mock authentication middleware to all booking routes
// router.use(mockAuth);

router.post("/", protect, createBooking);
router.get("/customer/:customerId", protect, getCustomerBookings);
router.patch("/:bookingId/cancel", protect, cancelBooking);
router.patch("/:bookingId/reschedule", protect, rescheduleBooking);
router.delete("/:bookingId", protect, deleteBooking);

export default router;
