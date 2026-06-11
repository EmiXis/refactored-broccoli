function modelPatients(controllerDB) {
  return {
    async getAll() {
      const sql = "SELECT * FROM patients;";
      return controllerDB.all(sql);
    },

    async get(id) {
      const sql = "SELECT * FROM patients WHERE id=$id;";
      return controllerDB.get(sql, { $id: id });
    },

    async create(data) {
      const sql = `
        INSERT INTO patients (name, last_name, birth_date, phone, email)
        VALUES ($name, $last_name, $birth_date, $phone, $email)
      `;
      return controllerDB.run(sql, {
        $name: data.name,
        $last_name: data.last_name,
        $birth_date: data.birth_date,
        $phone: data.phone,
        $email: data.email,
      });
    },

    async update(id, data) {
      const sql = `
        UPDATE patients
        SET name=$name,
            last_name=$last_name,
            birth_date=$birth_date,
            phone=$phone,
            email=$email
        WHERE id=$id
      `;
      return controllerDB.run(sql, {
        $name: data.name,
        $last_name: data.last_name,
        $birth_date: data.birth_date,
        $phone: data.phone,
        $email: data.email,
        $id: id,
      });
    },

    async remove(id) {
      const sql = "DELETE FROM patients WHERE id=$id;";
      return controllerDB.run(sql, { $id: id });
    },
  };
}

export default modelPatients;
