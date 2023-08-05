import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import CarCard from "./CarCard";
import { Button } from "@mui/material";
import { CreateCar } from "../components/index";

const CarList = () => {
  const snap = useSnapshot(state);
  const carList = snap.carList;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-100 py-2 min-h-screen overflow-auto">
      <div className="flex justify-center mb-3 mt-3">
        <Button
          sx={{
            minHeight: 75,
            marginRight: 0.5,
            marginLeft: 0.5,
            color: "black",
            bgcolor: "white",
            ":hover": {
              background: "linear-gradient(to right bottom, #430089, #82ffa1)",
              color: "white",
            },
          }}
          variant="contained"
        >
          Сформировать машину
        </Button>
      </div>
      <div className="flex justify-center">
        <CreateCar />
      </div>
      {carList.map((car) => (
        <CarCard
          key={car.id}
          destination={car.destination}
          summary={car.summary}
          weight={car.weight}
          items={car.items}
          showItems={car.showItems}
        />
      ))}
    </div>
  );
};

export default CarList;
