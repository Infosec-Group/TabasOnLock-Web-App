import { Schema, model } from "mongoose";

const BookingSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    stylistId: { type: String },
    stylistName: { type: String, required: true },
    stylistSpecialty: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String, 
      enum: ["confirmed", "cancelled", "completed"], 
      default: "confirmed" 
    },
    customerFirstName: { type: String, required: true },
    customerLastName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Booking", BookingSchema);
