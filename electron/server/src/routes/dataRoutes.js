import express from "express";
import {
  getAllData,
  addPosition,
  setPrice,
  copyAndCreateNewCollectionNextWeek,
  getListIds,
} from "../controllers/dataController.js";

const router = express.Router();

router.get("/data/idList", getListIds);
router.get("/data/:id", getAllData);
router.post("/data/:id/addPosition", addPosition);
router.post("/data/:id/setPrice", setPrice);
router.post("/:id/data/newDoc", copyAndCreateNewCollectionNextWeek);

export default router;
