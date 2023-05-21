import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import supplierRouter from "./routes/supplierRoute.js";
import itemRouter from "./routes/itemRoute.js";

const app = express();

const today = new Date().getDay();
const newTableDate = new Date()
  .toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  .replace(/\s/g, "")
  .replace(",", "")
  .replace(",", "");

let tableDate;

const db = async () => {
  await mongoose
    .connect(
      `mongodb+srv://Vell:ewwe3223@price.jleh77l.mongodb.net/${
        tableDate || ""
      }?retryWrites=true&w=majority`,
      {}
    )
    .then(() => console.log("DB OK"));
};

const startServer = async () => {
  try {
    if (today === 2) {
      tableDate = newTableDate;
      console.log(tableDate);
    }

    db();

    await app.listen(3002, () => console.log("SERVER OK PORT - 3002"));
  } catch (error) {
    console.log(error, "Error in start server");
  }
};

app.use(json());
app.use(cors());

app.use("/supplier", supplierRouter);
app.use("/item", itemRouter);

startServer();
