import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Protected Routes
router.post("/post", isAuthenticated, postJob);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// Public Routes
router.get("/get", getAllJobs);
router.get("/get/:id", getJobById);

export default router;