const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone_Number: { type: String, required: true },
    Password_Hash: { type: String, required: true, selected: false },
});

module.exports = mongoose.model("Customer", CustomerSchema);