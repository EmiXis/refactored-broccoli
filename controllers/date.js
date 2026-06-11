import modelAppointments from "../models/date.js";
import controllerDB from "../db/database.js";

const appointments = modelAppointments(controllerDB);

export const getAllAppointments = async (req, res) => {
  try {
    const result = await appointments.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const result = await appointments.get(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointment", error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const result = await appointments.create(req.body);
    res.status(201).json({
      message: "Appointment created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const result = await appointments.update(req.params.id, req.body);
    res.json({
      message: "Appointment updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating appointment", error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const result = await appointments.remove(req.params.id);
    res.json({
      message: "Appointment deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting appointment", error: error.message });
  }
};
