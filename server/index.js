import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import supplierRouter from "./routes/supplierRoute.js";
import itemRouter from "./routes/itemRoute.js";

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB, {}).then(() => console.log("DB OK"));
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
