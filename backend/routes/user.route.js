import express from "express";
import { register, login, logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Register (file optional)
router.post("/register", singleUpload, register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// ❌ Removed updateProfile (was causing crash)

export default router;