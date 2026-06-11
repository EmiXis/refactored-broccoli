function modelAppointments(controllerDB) {
  return {
    async getAll() {
      const sql = `
        SELECT 
          a.id,
          a.date,
          a.reason,
          d.name AS doctor,
          p.name AS patient
        FROM dates a
        JOIN doctors d ON a.doctor_id = d.id
        JOIN patients p ON a.patient_id = p.id;
      `;
      return controllerDB.all(sql);
    },

    async get(id) {
      const sql = `
        SELECT 
          a.id,
          a.date,
          a.reason,
          d.name AS doctor,
          p.name AS patient
        FROM dates a
        JOIN doctors d ON a.doctor_id = d.id
        JOIN patients p ON a.patient_id = p.id
        WHERE a.id=$id;
      `;
      return controllerDB.get(sql, { $id: id });
    },

    async create(data) {
      const sql = `
        INSERT INTO dates (date, reason, doctor_id, patient_id)
        VALUES ($date, $reason, $doctor_id, $patient_id)
      `;
      return controllerDB.run(sql, {
        $date: data.date,
        $reason: data.reason,
        $doctor_id: data.doctor_id,
        $patient_id: data.patient_id,
      });
    },

    async update(id, data) {
      const sql = `
        UPDATE dates
        SET date=$date,
            reason=$reason,
            doctor_id=$doctor_id,
            patient_id=$patient_id
        WHERE id=$id
      `;
      return controllerDB.run(sql, {
        $date: data.date,
        $reason: data.reason,
        $doctor_id: data.doctor_id,
        $patient_id: data.patient_id,
        $id: id,
      });
    },

    async remove(id) {
      const sql = "DELETE FROM dates WHERE id=$id;";
      return controllerDB.run(sql, { $id: id });
    },
  };
}

export default modelAppointments;
