import { proxy } from "valtio";

const state = proxy({
  carList: [],
  data: [],
  addingSupplier: false,
  addingPosition: false,
  suppliers: [{ header: "Позиции", accessorKey: "position" }],
  baseUrl: "http://localhost:3000",
  id: "64d9f9f62e541b92fad7e470",
});

export default state;
