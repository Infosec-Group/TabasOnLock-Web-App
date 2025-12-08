// import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { 
    date,
    time,
    stylistId,
    stylistName,
    stylistSpecialty,
    price,
    customerFirstName,
    customerLastName,
    customerEmail,
    customerPhone
  } = req.body;

  const existingBooking = await Booking.findOne({
    stylistId: stylistId,
    date: date,
    time: time,
    status: { $ne: "cancelled" }
  });

  if (existingBooking) {
    return res.status(409).json({
      message: `Booking conflict: ${stylistId} is already booked at ${time} on ${date}.`,
    });
  }

  const newBooking = new Booking({
    date,
    time,
    stylistId,
    stylistName,
    stylistSpecialty,
    price,
    customerFirstName,
    customerLastName,
    customerEmail,
    customerPhone,
    customerId: req.user.id,
  });

  const savedBooking = await newBooking.save();
  await savedBooking.populate("customerId", "firstName lastName email");

  const savedBookingData = savedBooking.toObject();
  savedBookingData.customer = {
    id: savedBookingData.customerId._id,
    firstName: savedBookingData.customerId.firstName,
    lastName: savedBookingData.customerId.lastName,
    email: savedBookingData.customerId.email,
  };
  savedBookingData.id = savedBookingData._id;
  delete savedBookingData._id;
  delete savedBookingData.__v;
  delete savedBookingData.customerId;

  res.status(201).json(savedBookingData);
});

export const getCustomerBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    customerId: req.params.customerId,
  })
    .populate("customerId", "firstName lastName email")
    .lean();

  const formattedBookings = bookings.map((booking) => {
    return {
      id: booking._id.toString(),
      date: booking.date,
      time: booking.time,
      status: booking.status,
      price: booking.price,
      stylist: {
        id: booking.stylistId,
        name: booking.stylistName,
        specialty: booking.stylistSpecialty,
      },
      customer: {
        firstName: booking.customerFirstName,
        lastName: booking.customerLastName,
        email: booking.customerEmail,
        phoneNumber: booking.customerPhone,
      },
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  });

  res.json(formattedBookings);
});

export const rescheduleBooking = asyncHandler(async (request, response) => {
  const { date, time } = request.body;
  const booking = await Booking.findById(request.params.bookingId);

  if(!booking) return response.status(404).json({ message: "Booking not found." });

  if (booking.customerId.toString() !== request.user.id) {
    return response
      .status(403)
      .json({ message: "Not authorized to reschedule this booking" });
  }

  if (booking.status !== "cancelled") {
    return res
      .status(400)
      .json({ message: "Only cancelled bookings can be rescheduled" });
  }

  const existingBooking = await Booking.findOne({
    stylistId: booking.stylistId,
    date: date,
    time: time,
    status: { $ne: "cancelled" },
    _id: { $ne: booking._id },
  });

  if(existingBooking) {
    return response.status(409).json({
      message: `Booking conflict: This stylist is already booked at ${time} on ${date}.`,
    })
  }

  booking.date = date;
  booking.time = time;
  booking.status = "confirmed"
  const updatedBooking = await booking.save();

  await updatedBooking.populate("customerId", "firstName lastName email");

  const bookingData = updatedBooking.toObject();
  bookingData.customer = {
    id: bookingData.customerId._id,
    firstName: bookingData.customerId.firstName,
    lastName: bookingData.customerId.lastName,
    email: bookingData.customerId.email,
  };
  bookingData.id = bookingData._id;
  delete bookingData._id;
  delete bookingData.__v;
  delete bookingData.customerId;

  response.json(bookingData);
});

export const cancelBooking = asyncHandler(async (request, response) => {
  const booking = await Booking.findById(request.params.bookingId);

  if(!booking) return response.status(404).json({ message: "Booking not found" });

  if(booking.customerId.toString() !== request.user.id) {
    return response
      .status(403)
      .json({ message: "Not authorized to cancel this booking" });
  }

  booking.status = "cancelled";
  await booking.save();

  response.json({ message: "Booking cancelled successfully" });
});

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (booking.customerId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this booking" });
  }
  await Booking.findByIdAndDelete(req.params.bookingId);
  res.json({ message: "Booking deleted successfully" });
});
