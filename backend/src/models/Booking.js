const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    Date: { type: Date, required: true },
    Time: { type: String, required: true },
    Customer_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    Stylist_Id: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", BookingSchema);