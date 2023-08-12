import express from "express";
const router = express.Router();
import {
  getCarList,
  addCar,
  deleteCar,
} from "../controllers/carListController.js";

router.get("/carList/getList/:id", getCarList);

router.post("/:id/carList/addCar", addCar);

router.delete("/carList/deleteCar", deleteCar);

export default router;
