import express from "express";
import {
  addItem,
  getItem,
  getAllItems,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/addItem", addItem);
router.get("/getitem/:id", getItem);
router.get("/getAllItems", getAllItems);
router.delete("/deleteItem/:id", deleteItem);

export default router;
