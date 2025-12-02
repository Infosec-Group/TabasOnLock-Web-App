const express = require("express");
const router = express.Router();

const mockAuth = require("../middleware/mockAuth");
const bookingController = require("../controllers/bookingController");

// Apply mock authentication middleware to all booking routes
router.use(mockAuth);

router.post("/", bookingController.createBooking);
router.get("/customer/:customerId", bookingController.getCustomerBookings);
router.put("/:bookingId", bookingController.updateBooking);
router.delete("/:bookingId", bookingController.deleteBooking);

module.exports = router;