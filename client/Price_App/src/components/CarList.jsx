import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import CarCard from "./CarCard";
import { Button } from "@mui/material";
import { CreateCar } from "../components/index";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const CarList = () => {
  const snap = useSnapshot(state);
  const [carList, setCarList] = useState([]);
  const [forceUpdateAdd, setForceUpdateAdd] = useState(false);
  const [forceUpdateDelete, setForceUpdateDelete] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleUpdateAdd = () => setForceUpdateAdd(!forceUpdateAdd);
  const handleUpdateDelete = () => setForceUpdateDelete(!forceUpdateDelete);

  useEffect(() => {
    try {
      setIsFetching(true);

      axios.get(`${snap.baseUrl}/carList/getList/${snap.id}`).then((res) => {
        state.carList = res.data;
        setCarList(res.data.reverse());
      });

      setIsFetching(false);
    } catch (error) {
      console.log("Error getting car list" + error.message);
    }
  }, [forceUpdateAdd, forceUpdateDelete, snap.id]);

  const handleRomoveItem = async (index) => {
    const updatedItems = carList.filter((_, i) => i !== index);
    state.carList = updatedItems;

    const itemToRemove = carList.filter((_, i) => i === index);
    const dbItem = { item: itemToRemove };
    console.log(itemToRemove);
    await axios.post(`${snap.baseUrl}/${snap.id}/carList/deleteCar`, dbItem);

    handleUpdateDelete();
    // console.log(snap.carList);
  };

  // console.log(snap.carList);
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-100 py-2 min-h-screen overflow-auto">
      <div className="flex justify-center">
        <CreateCar updateCarList={handleUpdateAdd} />
      </div>
      {isFetching && <CircularProgress />}
      {!isFetching &&
        carList.map((car, index) => (
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
