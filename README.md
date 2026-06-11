# Clinic API — Sistema de Gestión de Citas Médicas

API back-end para una clínica médica. Permite administrar doctores, pacientes y citas médicas, incluyendo la consulta de citas con información completa del doctor y paciente asociados.

**Tecnologías:** Node.js · Express · sqlite3

---

## Datos del equipo

| Campo | Detalle |
|---|---|
| **Institución** | Universidad Autónoma del Carmen — UNACAR |
| **Carrera** | Ingeniería en Sistemas Computacionales |
| **Materia** | Desarrollo de Aplicaciones con Base de Datos |
| **Profesor** | Jesús Alejandro Flores Hernández |

| Nombre | Matrícula | Rol |
|---|---|---|
| Emiliano Narciso Peralta Barrientos | 190537 | Backend / Base de Datos |

---

## Descripción del proyecto

**Clinic API** es una API REST para una clínica médica que permite gestionar doctores, pacientes y sus citas.

El sistema permite:
- Registrar y gestionar doctores con su especialidad de contacto.
- Registrar y gestionar pacientes con su información personal.
- Crear, consultar y administrar citas médicas que asocian un doctor con un paciente.
- Consultar el listado completo de citas con el nombre del doctor y paciente (JOIN).
- Eliminar doctores o pacientes con eliminación en cascada sobre sus citas.

---

## Requerimientos funcionales

1. El sistema debe permitir registrar, consultar, actualizar y eliminar doctores.
2. El sistema debe permitir registrar, consultar, actualizar y eliminar pacientes.
3. El sistema debe permitir crear citas médicas asociando un doctor y un paciente.
4. El sistema debe permitir consultar el listado de citas con información del doctor y paciente.
5. El sistema debe permitir actualizar y eliminar citas existentes.
6. Al eliminar un doctor o paciente, las citas asociadas se eliminan en cascada.

---

## Cómo ejecutar el proyecto

### Requisitos

- Node.js v18 o superior
- npm

### Pasos

**1. Instalar dependencias**
```bash
npm install
```

**2. Crear y poblar la base de datos**
```bash
npm run seed
```
Crea el archivo `clinic.db` con tablas y datos de ejemplo.

**3. Arrancar el servidor**
```bash
npm start
```
Servidor disponible en: `http://localhost:3000`

Para desarrollo con recarga automática:
```bash
npm run dev
```

---

## Estructura del proyecto

```
refactored-broccoli/
├── .gitignore
├── package.json
├── server.js               # Servidor Express — rutas y middleware
├── clinic.db               # Base de datos SQLite (generada por seed)
├── config/
│   └── createDb.js         # Clase alternativa de acceso a BD
├── db/
│   └── database.js         # Capa DAO — acceso a SQLite (sqlite3)
├── models/
│   ├── doctor.js           # Modelo de negocio: doctores
│   ├── patient.js          # Modelo de negocio: pacientes
│   └── date.js             # Modelo de negocio: citas médicas
├── controllers/
│   ├── doctor.js           # Controlador: lógica de doctores
│   ├── patient.js          # Controlador: lógica de pacientes
│   └── date.js             # Controlador: lógica de citas
├── routes/
│   ├── doctor.js           # Rutas: /api/doctors
│   ├── patient.js          # Rutas: /api/patients
│   └── date.js             # Rutas: /api/appointments
├── scripts/
│   └── createDb.js         # Script: crea y puebla la base de datos
└── README.md
```

---

## Base de datos

### Diagrama entidad-relación

```
┌───────────┐       ┌────────────┐       ┌───────────┐
│  doctors  │1─────N│   dates    │N─────1│  patients │
└───────────┘       └────────────┘       └───────────┘
```

- Un **doctor** puede tener varias **citas**.
- Un **paciente** puede tener varias **citas**.
- Una **cita** asocia exactamente un doctor y un paciente.
- Al eliminar un doctor o paciente, sus citas se eliminan en cascada (`ON DELETE CASCADE`).

### Descripción de tablas

**doctors** — profesionales médicos de la clínica.

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER PK | Identificador único |
| name | TEXT NOT NULL | Nombre del doctor |
| specialty | TEXT NOT NULL | Especialidad médica |
| phone | TEXT | Número de contacto |
| email | TEXT UNIQUE | Correo electrónico |

**patients** — personas atendidas en la clínica.

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER PK | Identificador único |
| name | TEXT NOT NULL | Nombre del paciente |
| last_name | TEXT | Apellido del paciente |
| birth_date | TEXT | Fecha de nacimiento (YYYY-MM-DD) |
| phone | TEXT | Número de contacto |
| email | TEXT UNIQUE | Correo electrónico |

**dates** — citas médicas programadas.

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER PK | Identificador único |
| date | TEXT NOT NULL | Fecha de la cita (YYYY-MM-DD) |
| reason | TEXT | Motivo de la consulta |
| doctor_id | INTEGER FK | Referencia a doctors.id |
| patient_id | INTEGER FK | Referencia a patients.id |

### Sentencias SQL

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS doctors (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL,
  specialty TEXT NOT NULL,
  phone     TEXT,
  email     TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS patients (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  last_name  TEXT,
  birth_date TEXT,
  phone      TEXT,
  email      TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS dates (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  date       TEXT NOT NULL,
  reason     TEXT,
  doctor_id  INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  FOREIGN KEY (doctor_id)  REFERENCES doctors(id)  ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
```

### Datos de ejemplo

```sql
-- Doctores
INSERT INTO doctors (name, specialty, phone, email) VALUES
('Alice Smith',   'Cardiology',    '555-1234', 'alice.smith@example.com'),
('Bob Johnson',   'Dermatology',   '555-2345', 'bob.johnson@example.com'),
('Carol Lee',     'Pediatrics',    '555-3456', 'carol.lee@example.com');

-- Pacientes
INSERT INTO patients (name, last_name, birth_date, phone, email) VALUES
('John',  'Doe',   '1985-01-12', '555-6789', 'john.doe@example.com'),
('Jane',  'Smith', '1990-03-22', '555-7890', 'jane.smith@example.com'),
('Mike',  'Brown', '2000-06-15', '555-8901', 'mike.brown@example.com');

-- Citas
INSERT INTO dates (date, reason, doctor_id, patient_id) VALUES
('2026-06-20', 'Routine checkup', 1, 1),
('2026-06-22', 'Skin rash',       2, 2),
('2026-06-25', 'Vaccination',     3, 3),
('2026-06-28', 'Follow-up',       1, 2);
```

---

## API — Referencia de endpoints

### Doctores

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/doctors` | Lista todos los doctores |
| GET | `/api/doctors/:id` | Obtiene un doctor por id |
| POST | `/api/doctors` | Crea un nuevo doctor |
| PUT | `/api/doctors/:id` | Actualiza un doctor |
| DELETE | `/api/doctors/:id` | Elimina un doctor |

### Pacientes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/patients` | Lista todos los pacientes |
| GET | `/api/patients/:id` | Obtiene un paciente por id |
| POST | `/api/patients` | Crea un nuevo paciente |
| PUT | `/api/patients/:id` | Actualiza un paciente |
| DELETE | `/api/patients/:id` | Elimina un paciente |

### Citas médicas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/appointments` | Lista todas las citas (con doctor y paciente) |
| GET | `/api/appointments/:id` | Obtiene una cita por id |
| POST | `/api/appointments` | Crea una nueva cita |
| PUT | `/api/appointments/:id` | Actualiza una cita |
| DELETE | `/api/appointments/:id` | Elimina una cita |

---

## Probar la API

### Con curl

```bash
# Todos los doctores
curl http://localhost:3000/api/doctors

# Doctor por id
curl http://localhost:3000/api/doctors/1

# Todos los pacientes
curl http://localhost:3000/api/patients

# Todas las citas (con nombres de doctor y paciente)
curl http://localhost:3000/api/appointments

# Crear doctor
curl -X POST http://localhost:3000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{"name":"Diana Prince","specialty":"Neurology","phone":"555-9999","email":"diana.prince@example.com"}'

# Crear cita
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-07-01","reason":"Annual review","doctor_id":1,"patient_id":3}'

# Actualizar doctor
curl -X PUT http://localhost:3000/api/doctors/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","specialty":"Neurology","phone":"555-1234","email":"alice.smith@example.com"}'

# Eliminar paciente
curl -X DELETE http://localhost:3000/api/patients/3
```
