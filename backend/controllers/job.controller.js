import { Job } from "../models/job.model.js";

// POST JOB (FIXED)
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experienceLevel,
      jobType,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // FIX: proper validation
    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !experienceLevel ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements
        ? requirements.split(",").map((r) => r.trim())
        : [],
      salary: Number(salary),
      location,
      experienceLevel: Number(experienceLevel),
      jobType,
      position: Number(position),
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });

  } catch (error) {
    console.log("JOB ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};

// GET JOB BY ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};

// GET ADMIN JOBS
export const getAdminJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ created_by: req.id });

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};