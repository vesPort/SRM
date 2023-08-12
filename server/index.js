import express, { json } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import mongoose from "mongoose";
import is_online from "is-online";

import Data from "./src/schemas/DataSchema.js";
import carListRoutes from "./src/routes/carListRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import dataRoutes from "./src/routes/dataRoutes.js";

const app = express();
const port = 3000;
const online = await is_online();

app.use(cors());
app.use(json());
sqlite3.verbose();

app.use(carListRoutes);
app.use(supplierRoutes);
app.use(dataRoutes);

const db = new sqlite3.Database("SRM.db");

db.serialize(() => {
  // Создание таблицы
  db.run(`CREATE TABLE IF NOT EXISTS SRM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carList TEXT,
    data TEXT,
    addingSupplier INTEGER,
    addingPosition INTEGER,
    suppliers TEXT
  )`);

  console.log("Database initialized");
});

const createNewMongoDb = async () => {
  // Создание новой записи
  const newData = new Data({
    carList: [],
    data: [],
    addingSupplier: false,
    addingPosition: false,
    positions: [],
    suppliers: [{ header: "Позиции", accessorKey: "position" }],
  });

  newData
    .save()
    .then(() => {
      console.log("New data saved to MongoDB");
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};

mongoose
  .connect("mongodb+srv://vesyport:ewwe3223@price.83daey0.mongodb.net/SRM")
  .then({
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/data", (req, res) => {
  if (is_online) {
    Data.find().then((data) => res.json(data));
  } else {
    db.all("SELECT * FROM SRM", (err, rows) => {
      if (err) {
        console.error("Error querying SQLite:", err);
        res.status(500).send("Error querying SQLite");
      } else {
        res.json(rows);
      }
    });
  }
});


app.listen(port, () => console.log(`Server is running at port ${port}`));
