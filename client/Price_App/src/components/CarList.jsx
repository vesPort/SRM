import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import CarCard from "./CarCard";
import { Button } from "@mui/material";
import { CreateCar } from "../components/index";
import axios from "axios";

const CarList = () => {
  const snap = useSnapshot(state);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    try {
      axios.get(`${snap.baseUrl}/carList/getList/${snap.id}`).then((res) => {
        state.carList = res.data;
        setCarList(res.data.reverse())
      });
    } catch (error) {
      console.log("Error getting car list" + error.message);
    }
  }, []);

  const handleRomoveItem = (index) => {
    const updatedItems = carList.filter((_, i) => i !== index);
    state.carList = updatedItems;
    // console.log(snap.carList);
  };

  // console.log(snap.carList);
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-100 py-2 min-h-screen overflow-auto">
      <div className="flex justify-center">
        <CreateCar />
      </div>
      {carList.map((car, index) => (
        <CarCard
          key={index}
          id={car.id}
          destination={car.destination}
          summary={car.summary}
          weight={car.weight}
          items={car.items}
          showItems={car.showItems}
          position={car.position}
          button={
            <Button
              sx={{
                background: "linear-gradient(to right, red, gray)",
                color: "white",
                minWidth: "90%",
                "&:hover": {
                  background: "red",
                },
              }}
              onClick={() => handleRomoveItem(index)}
            >
              Удалить
            </Button>
          }
        />
      ))}
    </div>
  );
};

export default CarList;
