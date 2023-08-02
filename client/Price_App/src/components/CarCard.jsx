import React, { useState } from "react";
import { useSnapshot } from "valtio";

const CarCard = ({ destination, summary, weight, items }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-gray-600 text-center rounded-md mt-2 mr-2 ml-2 p-1">
      <div className="flex justify-around">
        <p>{destination}</p>
        <div>{weight}</div>
      </div>
      <div>Общая стоимость : {summary}</div>
      {show && (
        <div className="max-h-52 overflow-auto">
          Продукция :
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-around border-solid border-2 border-black rounded mt-2 bg-gray-400"
            >
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      )}
      <div
        className="flex justify-center mt-2 m-1 p-1 border-dashed border-4 rounded-lg border-white hover:bg-gray-800 hover:border-solid hover:text-lg"
        onClick={() => setShow(!show)}
      >
        {show ? "Свернуть" : "Подробней"}
      </div>
    </div>
  );
};

export default CarCard;
