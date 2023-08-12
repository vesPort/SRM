import { proxy } from "valtio";
import data from "../moch_data";

const state = proxy({
  carList: [],
  data: [],
  addingSupplier: false,
  addingPosition: false,
  suppliers: [{ header: "Позиции", accessorKey: "position" }],
  baseUrl: "http://localhost:3000",
  id: "64d3917bd67eb63ca611a7e8",
});

export default state;
