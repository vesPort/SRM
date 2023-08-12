import { Button, MenuItem, Select, TextField } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import React, { useState } from "react";
import state from "../store";
import { useSnapshot } from "valtio";
import axios from "axios";

const CreateCar = () => {
  const snap = useSnapshot(state);

  const [isCreating, setIsCreating] = useState(false);

  const [supplier, setSupplier] = useState({ name: "" });
  const [selectValue, setSelectValue] = useState({
    position: "",
    price: 0,
    name: "",
  });
  const [weight, setWeight] = useState("");
  const [destination, setDestination] = useState("");
  const [summary, setSummary] = useState(0);
  const [summWeight, setSummWeight] = useState(0);
  const [items, setItems] = useState([
    {
      id: 0,
      position: "Позиция",
      name: "Поставщик",
      price: "Цена",
      quantity: "Вес",
    },
  ]);
  //   const [newItem, setNewItem] = useState({
  //     id: snap.carList.length,
  //     name: "",
  //     price: 0,
  //     quantity: 0,
  //   });

  const positions = snap.data.map((item) => {
    return { position: item.position, price: item[`${supplier.name}`] };
  });

  const handleFirstSelected = (evt) => {
    setSupplier({ name: evt.target.value });
  };

  const handleSecondSelected = (evt) => {
    setSelectValue({ name: evt.target.value });
    console.log(selectValue);
  };

  const handleAddItem = (id, name, supplier, quantity) => {
    // setItems(
    //   ...items,
    //   ...[{ id, supplier, name: name, price: price, quantity: quantity }]
    // );
    // console.log(items);
    const newObj = {
      id,
      position: supplier,
      name: name.name.charAt(0).toUpperCase() + name.name.slice(1),
      price: snap.data
        .map((item) => {
          if (item.position === supplier) {
            setSummary(
              summary + parseFloat(item[`${name.name}`]) * parseFloat(quantity)
            );
            return item[`${name.name}`];
          }
        })
        .toString()
        .replace(/[,a-zA-Z]/g, ""),
      quantity: quantity,
    };

    setSummWeight(summWeight + parseFloat(quantity));

    setItems([...items, newObj]);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setSummWeight(summWeight - parseFloat(items[index].quantity));
    setSummary(
      summary -
        parseFloat(items[index].price) * parseFloat(items[index].quantity)
    );
  };

  const handleCreateCar = async () => {
    const car = {
      destination: destination,
      summary: summary,
      weight: summWeight,
      items: items,
    };

    const dbCar = {
      destination: destination,
      items: items,
    };

    await axios.post(`${snap.baseUrl}/${snap.id}/carList/addCar`, dbCar);

    state.carList.push(car);
    setIsCreating(false);
    setDestination("");
    setSummWeight(0);
    setSummary(0);
    setItems([
      {
        id: 0,
        position: "Позиция",
        name: "Поставщик",
        price: "Цена",
        quantity: "Вес",
      },
    ]);
    setWeight(0);
    setSelectValue({ name: "", price: 0 });
    setSupplier({ name: "" });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-800 to-gray-400 text-center border-solid border-black border-2 rounded-md mt-2 mr-2 ml-2 p-1 w-4/5">
        {isCreating && (
          <div>
            <div className="flex justify-around">
              <div>
                {destination.length > 2 ? destination + " :" : "Направление :"}
              </div>
              <div>{summWeight}</div>
            </div>
            <div className="flex justify-around">
              <div>Общая стоимость :</div>
              <div className="">{summary.toFixed(2)}</div>
            </div>
            <div className="mt-2">
              <TextField
                placeholder="Направление"
                value={destination}
                onChange={(evt) => setDestination(evt.target.value)}
              ></TextField>
            </div>
            <div className="flex justify-around">
              <Select
                placeholder="Поставщик"
                value={supplier.name}
                autoWidth={true}
                sx={{ minWidth: 120, marginTop: 2 }}
                onChange={(evt) => handleFirstSelected(evt)}
              >
                {/* {snap.suppliers.map((supplier) => {
                  if (supplier.header !== "Позиции") {
                    if (!supplier.header.endsWith("Z")) {
                      if (!supplier.header.endsWith("D")) {
                        return (
                          <MenuItem
                            key={supplier.accessorKey}
                            value={supplier.accessorKey}
                          >
                            {supplier.header}
                          </MenuItem>
                        );
                      }
                    }
                  }
                })} */}
                {snap.suppliers.map((supp) => {
                  if (
                    supp.header !== "Позиции" &&
                    !supp.header.endsWith("Z") &&
                    !supp.header.endsWith("D")
                  ) {
                    return (
                      <MenuItem
                        key={supp.accessorKey}
                        value={supp.header}
                      >
                        {supp.header.toUpperCase()}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
              <Select
                placeholder="Позиция"
                value={selectValue.name}
                sx={{ minWidth: 120, marginTop: 2 }}
                onChange={(event) => handleSecondSelected(event)}
              >
                {positions.map((item) => (
                  <MenuItem
                    key={item.position}
                    sx={{ display: "flex", justifyContent: "space-around" }}
                    value={item.position}
                  >
                    {item.position} Цена: {item.price}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-around items-center mt-2 h-20 p-2">
              <TextField
                placeholder="Вес"
                value={weight}
                sx={{ minHeight: 50, marginRight: 2 }}
                onChange={(evt) => setWeight(evt.target.value)}
              ></TextField>
              <Button
                sx={{ bgcolor: "yellowgreen", minHeight: 50 }}
                onClick={() =>
                  handleAddItem(
                    snap.carList.length,
                    supplier,
                    selectValue.name,
                    weight
                  )
                }
              >
                <DoneOutlineIcon sx={{ color: "white" }} />
              </Button>
            </div>
            {items.length > 0 && (
              <div className="max-h-52 overflow-auto">
                Продукция :
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex justify-around border-solid border-2 border-black rounded mt-2 bg-gray-100 text-stone-700"
                    onDoubleClick={() => handleDelete(index)}
                  >
                    <p>{item.name}</p>
                    <p>{item.position}</p>
                    <p>{item.price}</p>
                    <p>{item.quantity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center mb-3 mt-3">
          <Button
            sx={{
              minHeight: 75,
              marginRight: 0.5,
              marginLeft: 0.5,
              color: "black",
              bgcolor: "white",
              ":hover": {
                background:
                  "linear-gradient(to right bottom, #430089, #82ffa1)",
                color: "white",
              },
            }}
            variant="contained"
            onClick={() =>
              isCreating ? handleCreateCar() : setIsCreating(true)
            }
          >
            Сформировать машину
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateCar;
