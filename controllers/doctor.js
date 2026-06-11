import modelDoctors from "../models/doctor.js";
import controllerDB from "../db/database.js";

const doctors = modelDoctors(controllerDB);

export const getAllDoctors = async (req, res) => {
  try {
    const result = await doctors.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const result = await doctors.get(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const result = await doctors.create(req.body);
    res.status(201).json({
      message: "Doctor created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const result = await doctors.update(req.params.id, req.body);
    res.json({
      message: "Doctor updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const result = await doctors.remove(req.params.id);
    res.json({
      message: "Doctor deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error: error.message });
  }
};
