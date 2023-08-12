import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  carList: Array,
  data: Array,
  addingSupplier: Boolean,
  addingPosition: Boolean,
  suppliers: Array,
  positions: [],
});

const Data = mongoose.model("Data", dataSchema);

export default Data;
