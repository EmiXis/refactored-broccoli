import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

class DB {
  constructor() {
    this.db = null;
  }

  open() {
    if (this.db) return;
    this.db = new sqlite.Database("./clinic.db", (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      }
    });
  }

  run(sql, params = []) {
    this.open();
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  get(sql, params = []) {
    this.open();
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  all(sql, params = []) {
    this.open();
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

const db = new DB();

export default db;
