import express, { json } from "express";
import cors from "cors";
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

app.use(carListRoutes);
app.use(supplierRoutes);
app.use(dataRoutes);


const createNewMongoDb = async () => {
  // Создание новой записи
  const newData = new Data({
    carList: [],
    data: [],
    addingSupplier: false,
    addingPosition: false,
    positions: [],
    suppliers: [{ header: "Позиции", accessorKey: "position" }],
    expireAt: { type: Date, default: Date.now, index: { expires: "21d" } },
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

// createNewMongoDb();

mongoose
  .connect("")
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
  Data.find().then((data) => res.json(data));
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
