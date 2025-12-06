import { Schema, model } from "mongoose";

const BookingSchema = new Schema({
    Date: { type: Date, required: true },
    Time: { type: String, required: true },
    Customer_ID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    Stylist_Id: { type: String },
}, {
    timestamps: true
});

export default model("Booking", BookingSchema);