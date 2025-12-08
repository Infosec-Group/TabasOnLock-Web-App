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
  },
  {
    timestamps: true,
  }
);

export default model("Booking", BookingSchema);
