import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import CarCard from "./CarCard";

const CarList = () => {
  const snap = useSnapshot(state);
  const carList = snap.carList;

  return (
    <div className="bg-gray-200 py-2 max-h-max overflow-auto">
      <div className="flex justify-center">Here</div>
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
