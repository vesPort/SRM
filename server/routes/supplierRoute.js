import express from "express";
import {
  addSupplier,
  deleteSupplier,
  getSupplier,
  renameSupplier,
  setDone,
  setOrder,
  setPrice,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/addSupplier", addSupplier);
router.delete("/deleteSupplier/:id", deleteSupplier);
router.get("/getSupplier/:id", getSupplier);
router.put("/updateSupplier/:id", renameSupplier);
router.put("/:id/:itemId", setPrice);
router.put("/order/:id/:itemId", setOrder);
router.put("/done/:id/:itemId", setDone);

export default router;
