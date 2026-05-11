import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus
} from "../controllers/application.controller.js";

const router = express.Router();

// Students apply to a job
router.post("/apply/:id", isAuthenticated, applyJob);

// Students get all applied jobs
router.get("/myapplications", isAuthenticated, getAppliedJobs);

// Admin/Company get all applicants for a job
router.get("/applicants/:id", isAuthenticated, getApplicants);

// Admin/Company update application status
router.put("/status/:id", isAuthenticated, updateStatus);

export default router;
