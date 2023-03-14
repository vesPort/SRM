import express from "express";
import {
  addSupplier,
  deleteSupplier,
  getSupplier,
  renameSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/addSupplier", addSupplier);
router.delete("/deleteSupplier/:id", deleteSupplier);
router.get("/getSupplier/:id", getSupplier);
router.put("/updateSupplier/:id", renameSupplier);

export default router;
