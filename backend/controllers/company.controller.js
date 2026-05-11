import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register same company again",
        success: false,
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });

  } catch (error) {
    console.log("REGISTER COMPANY ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// GET COMPANIES OF USER
export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({
      companies,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};

// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
};

// UPDATE COMPANY
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let logo;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
  }
};