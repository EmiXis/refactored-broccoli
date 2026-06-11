function modelDoctors(controllerDB) {
  return {
    async getAll() {
      const sql = "SELECT * FROM doctors;";
      return controllerDB.all(sql);
    },

    async get(id) {
      const sql = "SELECT * FROM doctors WHERE id=$id;";
      return controllerDB.get(sql, { $id: id });
    },

    async create(data) {
      const sql = `
        INSERT INTO doctors (name, specialty, phone, email)
        VALUES ($name, $specialty, $phone, $email)
      `;
      return controllerDB.run(sql, {
        $name: data.name,
        $specialty: data.specialty,
        $phone: data.phone,
        $email: data.email,
      });
    },

    async update(id, data) {
      const sql = `
        UPDATE doctors
        SET name=$name,
            specialty=$specialty,
            phone=$phone,
            email=$email
        WHERE id=$id
      `;
      return controllerDB.run(sql, {
        $name: data.name,
        $specialty: data.specialty,
        $phone: data.phone,
        $email: data.email,
        $id: id,
      });
    },

    async remove(id) {
      const sql = "DELETE FROM doctors WHERE id=$id;";
      return controllerDB.run(sql, { $id: id });
    }
  };
}

export default modelDoctors;
