import Customer from "../models/Customer.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getCustomerById = asyncHandler(async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId).lean();
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    customer.id = customer._id;
    delete customer._id;
    delete customer.__v;
    delete customer.passwordHash;
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
