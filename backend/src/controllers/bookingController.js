// import mongoose from "mongoose";
import Booking, { findOne, find, findById, findByIdAndDelete } from "../models/Booking";
import asyncHandler from "../middleware/asyncHandler";

export const createBooking = asyncHandler(async (req, res) => {
    const { Date, Time, Stylist_Id } = req.body;

    const existingBooking = await findOne({
        Stylist_Id: Stylist_Id,
        Date: Date,
        Time: Time
    }); 
    if (existingBooking) {
        return res.status(409).json({ 
            message: `Booking conflict: ${Stylist_Id} is already booked at ${Time} on ${Date}.` 
        });
    }

    const newBooking = new Booking({
        ...req.body,
        Customer_ID: req.user.id,
    });
    const savedBooking = await newBooking.save();
    await savedBooking.populate("Customer_ID", "First_name Last_name Email");

    res.status(201).json(savedBooking);
});

export const getCustomerBookings = asyncHandler(async (req, res) => {
    const bookings = await find({ 
        Customer_ID: req.params.customerId 
    }).populate("Customer_ID", "First_name Last_name Email");
    res.json(bookings);
});

export const updateBooking = asyncHandler(async (req, res) => {
    const booking = await findById(req.params.bookingId);   
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }   
    if (booking.Customer_ID.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this booking" });
    }
    Object.assign(booking, req.body);
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
});

export const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await findById(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.Customer_ID.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this booking" });
    }
    await findByIdAndDelete(req.params.bookingId);
    res.json({ message: "Booking deleted successfully" });
});

