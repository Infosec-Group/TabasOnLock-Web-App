const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();

router.get("/:customerId", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId).lean();
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        delete customer.Password_Hash;
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;