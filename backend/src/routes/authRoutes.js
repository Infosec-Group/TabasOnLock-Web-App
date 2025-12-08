import express from "express";
import { getUser, login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", protect, getUser);

export default router;