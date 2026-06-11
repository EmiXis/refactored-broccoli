import modelPatients from "../models/patient.js";
import controllerDB from "../db/database.js";

const patients = modelPatients(controllerDB);

export const getAllPatients = async (req, res) => {
  try {
    const result = await patients.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const result = await patients.get(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const result = await patients.create(req.body);
    res.status(201).json({
      message: "Patient created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const result = await patients.update(req.params.id, req.body);
    res.json({
      message: "Patient updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const result = await patients.remove(req.params.id);
    res.json({
      message: "Patient deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error: error.message });
  }
};
