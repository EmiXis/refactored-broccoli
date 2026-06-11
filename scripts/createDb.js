// Script to create and populate the medical database
// Run: node scripts/createDB.js

import { DatabaseSync } from "node:sqlite";

const DB_NAME = process.env.DB_NAME || "clinic.db";
const db = new DatabaseSync(DB_NAME);

db.exec("PRAGMA foreign_keys = ON;");

// ──────────────────────────────────────────
// CREATE TABLES
// ──────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    phone TEXT,
    email TEXT UNIQUE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    last_name TEXT,
    birth_date TEXT,
    phone TEXT,
    email TEXT UNIQUE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    reason TEXT,
    doctor_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    FOREIGN KEY(doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE CASCADE
  );
`);

console.log("✓ Tables created");

// ──────────────────────────────────────────
// DOCTORS
// ──────────────────────────────────────────

const insertDoctor = db.prepare(`
  INSERT INTO doctors (name, specialty, phone, email)
  VALUES (@name, @specialty, @phone, @email)
`);

const doctors = [
  {
    name: "Alice Smith",
    specialty: "Cardiology",
    phone: "555-1234",
    email: "alice.smith@example.com",
  },
  {
    name: "Bob Johnson",
    specialty: "Dermatology",
    phone: "555-2345",
    email: "bob.johnson@example.com",
  },
  {
    name: "Carol Lee",
    specialty: "Pediatrics",
    phone: "555-3456",
    email: "carol.lee@example.com",
  },
];

doctors.forEach((d) => insertDoctor.run(d));
console.log(`✓ ${doctors.length} doctors inserted`);

// ──────────────────────────────────────────
// PATIENTS
// ──────────────────────────────────────────

const insertPatient = db.prepare(`
  INSERT INTO patients (name, last_name, birth_date, phone, email)
  VALUES (@name, @last_name, @birth_date, @phone, @email)
`);

const patients = [
  {
    name: "John",
    last_name: "Doe",
    birth_date: "1985-01-12",
    phone: "555-6789",
    email: "john.doe@example.com",
  },
  {
    name: "Jane",
    last_name: "Smith",
    birth_date: "1990-03-22",
    phone: "555-7890",
    email: "jane.smith@example.com",
  },
  {
    name: "Mike",
    last_name: "Brown",
    birth_date: "2000-06-15",
    phone: "555-8901",
    email: "mike.brown@example.com",
  },
];

patients.forEach((p) => insertPatient.run(p));
console.log(`✓ ${patients.length} patients inserted`);

// ──────────────────────────────────────────
// APPOINTMENTS
// ──────────────────────────────────────────

const insertAppointment = db.prepare(`
  INSERT INTO dates (date, reason, doctor_id, patient_id)
  VALUES (@date, @reason, @doctor_id, @patient_id)
`);

const appointments = [
  {
    date: "2026-06-20",
    reason: "Routine checkup",
    doctor_id: 1,
    patient_id: 1,
  },
  { date: "2026-06-22", reason: "Skin rash", doctor_id: 2, patient_id: 2 },
  { date: "2026-06-25", reason: "Vaccination", doctor_id: 3, patient_id: 3 },
  { date: "2026-06-28", reason: "Follow-up", doctor_id: 1, patient_id: 2 },
];

appointments.forEach((a) => insertAppointment.run(a));
console.log(`✓ ${appointments.length} appointments inserted`);

db.close();
console.log(`\n✓ Database ready: ${DB_NAME}`);
