import mongoose from "mongoose";

const itemScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
});

export const ItemModel = mongoose.model("Items", itemScema);
