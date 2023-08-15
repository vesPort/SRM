import express from "express";
const router = express.Router();
import {
  addSupplier,
  deleteSupplier,
  getSuppliers,
} from "../controllers/supplierController.js";

router.get("/:id/getSuppliers", getSuppliers);
router.post("/:id/addSupplier", addSupplier);
router.delete("/deleteSupplier", deleteSupplier);

export default router;
