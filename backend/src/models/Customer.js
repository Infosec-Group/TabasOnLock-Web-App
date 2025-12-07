import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  passwordHash: { type: String, required: true, selected: false },
});

export default model("Customer", CustomerSchema);
