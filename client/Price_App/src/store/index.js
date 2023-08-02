import { proxy } from "valtio";
import data from "../moch_data";

const state = proxy({
  carList: [
    {
      id: 1,
      destination: "Kharkov",
      summary: 10000,
      weight: 5000,
      items: [
        { id: 1, name: "Oкорок", price: 88, quantity: 574 },
        { id: 2, name: "Грудка", price: 150, quantity: 500 },
        { id: 3, name: "Грудка", price: 150, quantity: 500 },
        { id: 4, name: "Грудка", price: 150, quantity: 500 },
        { id: 5, name: "Грудка", price: 150, quantity: 500 },
        { id: 6, name: "Грудка", price: 150, quantity: 500 },
        { id: 7, name: "Грудка", price: 150, quantity: 500 },
        { id: 8, name: "Грудка", price: 150, quantity: 500 },
      ],
    },
    {
      id: 2,
      destination: "Dnepr",
      summary: 7000,
      weight: 5000,
      items: [
        { id: 1, name: "Oкорок", price: 88, quantity: 574 },
        { id: 2, name: "Грудка", price: 150, quantity: 500 },
      ],
    },
    {
      id: 3,
      destination: "Dnepr",
      summary: 7000,
      weight: 5000,
      items: [
        { id: 1, name: "Oкорок", price: 88, quantity: 574 },
        { id: 2, name: "Грудка", price: 150, quantity: 500 },
      ],
    },
    {
      id: 4,
      destination: "Dnepr",
      summary: 7000,
      weight: 5000,
      items: [
        { id: 1, name: "Oкорок", price: 88, quantity: 574 },
        { id: 2, name: "Грудка", price: 150, quantity: 500 },
      ],
    },
    {
      id: 5,
      destination: "Dnepr",
      summary: 7000,
      weight: 5000,
      items: [
        { id: 1, name: "Oкорок", price: 88, quantity: 574 },
        { id: 2, name: "Грудка", price: 150, quantity: 500 },
      ],
    },
  ],
  data: [],
  addingSupplier: false,
  addingPosition: false,
  suppliers: [
    { header: "Позиции", accessorKey: "position" },
  ],
});

export default state;
