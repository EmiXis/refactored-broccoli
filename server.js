import express from "express";

import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";
import dateRoutes from "./routes/date.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", dateRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
