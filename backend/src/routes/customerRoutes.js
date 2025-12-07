import { Router } from "express";
import { getCustomerById } from "../controllers/customerController.js";

const router = Router();

router.get("/id/:customerId", getCustomerById);

export default router;
