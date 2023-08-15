// const sqlite3 = require("sqlite3").verbose();
import sqlite3 from "sqlite3";
sqlite3.verbose();
const db = new sqlite3.Database("SRM.db");

// Создание таблицы и вставка начальных данных
const createDatabase = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          carList TEXT,
          data TEXT,
          addingSupplier INTEGER,
          addingPosition INTEGER,
          suppliers TEXT
        )`);

    const initialData = {
      carList: JSON.stringify([]),
      data: JSON.stringify([]),
      addingSupplier: 0,
      addingPosition: 0,
      suppliers: JSON.stringify([
        { header: "Позиции", accessorKey: "position" },
      ]),
    };

    const stmt = db.prepare(
      "INSERT INTO data (carList, data, addingSupplier, addingPosition, suppliers) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(
      initialData.carList,
      initialData.data,
      initialData.addingSupplier,
      initialData.addingPosition,
      initialData.suppliers
    );
    stmt.finalize();

    console.log("Database initialized");
  });

  console.log("DB created");
  db.close();
};

export default createDatabase;
