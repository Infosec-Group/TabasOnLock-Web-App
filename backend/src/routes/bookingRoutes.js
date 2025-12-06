import { Router } from "express";
import { mockAuth } from "../middleware/mockAuth.js";
import { 
    createBooking, 
    getCustomerBookings, 
    updateBooking, 
    deleteBooking 
} from "../controllers/bookingController.js";

const router = Router();

// Apply mock authentication middleware to all booking routes
router.use(mockAuth);

router.post("/", createBooking);
router.get("/customer/:customerId", getCustomerBookings);
router.put("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);

export default router;