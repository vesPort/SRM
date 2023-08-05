import React, { useState } from "react";
import { useSnapshot } from "valtio";

const CarCard = ({ destination, summary, weight, items }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-400 text-center border-solid border-black border-2 rounded-md mt-2 mr-2 ml-2 p-1">
      <div className="flex justify-between">
        <p className="ml-2 font-mono font-bold">{destination}</p>
        <div className="mr-2">{summary}</div>
      </div>
      <div className="flex justify-between ml-2 font-bold">
        Общая стоимость : <p className="mr-2 font-normal">{weight}</p>
      </div>
      {show && (
        <div className="max-h-52 overflow-auto">
          Продукция :
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-around border-solid border-2 border-black rounded mt-2 bg-gray-100 text-stone-700"
            >
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      )}
      <div
        className="flex justify-center mt-2 m-1 p-1 border-dashed border-2 rounded-lg border-white hover:bg-gray-800 hover:border-solid hover:text-lg hover:animate-pulse"
        onClick={() => setShow(!show)}
      >
        {show ? "Свернуть" : "Подробней"}
      </div>
    </div>
  );
};

export default CarCard;
