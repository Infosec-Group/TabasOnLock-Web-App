import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Phone_Number: { type: String, required: true },
    Password_Hash: { type: String, required: true, selected: false },
});

export default model("Customer", CustomerSchema);