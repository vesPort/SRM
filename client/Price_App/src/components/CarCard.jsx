import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const CarCard = ({ destination, summary, weight, items, button }) => {
  const snap = useSnapshot(state);
  const [show, setShow] = useState(false);
  const [carItems, setCarItems] = useState(() => items);
  const [carSummary, setNewSummary] = useState(() => summary);
  const [carWeight, setCarWeight] = useState(() => weight);

  const handleDelete = (index) => {
    const newItems = carItems.filter((_, i) => i !== index);
    let newSum = 0;
    let newWeight = 0;

    newItems.map((item) => {
      newSum += item.price;
      newWeight += item.quantity;
    });

    state.carList[index].items = newItems;
    state.carList[index].summary = newSum;
    state.carList[index].weight = newWeight;

    setCarItems(newItems);
    setNewSummary(newSum);
    setCarWeight(newWeight);
  };

  // const handleEditItem = (index) => {
  // setIsEdit(true);
  // setDoneEdit(true);
  // setEditingItemId(index);

  // const newItem = {
  //   name: supplier,
  //   price: price,
  //   quantity: quantity,
  //   position: position,
  // };

  // state.carList[index].items.map((item) => {
  //   item.id === index ? (item = newItem) : item;
  // });
  // };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-400 text-center border-solid border-black border-2 rounded-md mt-2 mr-2 ml-2 p-1">
      <div className="flex justify-between">
        <p className="ml-2 font-mono font-bold">{destination}</p>
        <div className="mr-2">{carWeight}</div>
      </div>
      <div className="flex justify-between ml-2 font-bold">
        Общая стоимость : <p className="mr-2 font-normal">{carSummary}</p>
      </div>
      {show && (
        <div className="max-h-52 overflow-auto">
          Продукция :
          {carItems.map((item, index) => {
            console.log(item);

            return (
              <div
                key={index}
                className="flex justify-around border-solid border-2 border-black rounded mt-2 bg-gray-100 text-stone-700 hover:bg-gray-400 hover:text-lg"
                onDoubleClick={() => handleDelete(index)}
              >
                <>
                  <p>{item.supplier}</p>
                  <p>{item.position || item.item}</p>
                  <p>{item.price}</p>
                  <p>{item.quantity}</p>
                </>
              </div>
            );
          })}
        </div>
      )}
      <div className="">
        <div
          className="flex justify-center mt-2 m-1 p-1 border-dashed border-2 rounded-lg border-white hover:bg-gray-800 hover:border-solid hover:text-lg hover:animate-pulse"
          onClick={() => setShow(!show)}
        >
          {show ? "Свернуть" : "Подробней"}
        </div>
        {button}
      </div>
    </div>
  );
};

export default CarCard;
