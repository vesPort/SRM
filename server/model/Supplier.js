import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [],
});

export const SupplierModel = mongoose.model("Suppliers", supplierSchema);
