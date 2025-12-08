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
    const formattedBooking = { ...booking };

    const formattedCustomer = {
      id: formattedBooking.customerId._id,
      ...formattedBooking.customerId,
    };

    delete formattedCustomer._id;
    delete formattedCustomer.__v;
    delete formattedBooking.customerId;
    formattedBooking.id = formattedBooking._id;
    delete formattedBooking._id;
    delete formattedBooking.__v;
    formattedBooking.customer = formattedCustomer;

    return formattedBooking;
  });

  res.json(formattedBookings);
});

export const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (booking.customerId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this booking" });
  }
  Object.assign(booking, req.body);
  const updatedBooking = await booking.save();
  const bookingData = updatedBooking.toObject();
  bookingData.id = bookingData._id;
  delete bookingData._id;
  delete bookingData.__v;
  res.json(bookingData);
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
