import express from "express";
import {
  getAllData,
  addPosition,
  setPrice,
} from "../controllers/dataController.js";

const router = express.Router();

router.get("/data/:id", getAllData);
router.post("/data/:id/addPosition", addPosition);
router.post("/data/:id/setPrice", setPrice);

export default router;
