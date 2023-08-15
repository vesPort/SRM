import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  carList: [],
  data: [],
  addingSupplier: Boolean,
  addingPosition: Boolean,
  suppliers: Array,
  positions: [],
  createdAt: { type: Date, expires: "21d", default: Date.now },
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
