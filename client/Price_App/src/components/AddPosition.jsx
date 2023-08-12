import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import state from "../store";
import { useSnapshot } from "valtio";
import axios from "axios";

const AddPosition = ({ updateTable }) => {
  const snap = useSnapshot(state);
  const [newPosition, setNewPosition] = useState("");

  const handleSubmit = async () => {
    // await state.data.push({ position: newPosition, state.su });
    const position = { position: newPosition };
    state.suppliers.forEach((supplier) => {
      if (supplier.accessorKey !== "position")
        position[`${supplier.accessorKey}`] = 0;
    });
    state.data.push(position);
    await axios.post(`${snap.baseUrl}/data/${snap.id}/addPosition`, position);

    updateTable();

    state.addingPosition = false;
    setNewPosition("");
  };

  return (
    <div className="h-52">
      <p className="text-lg flex justify-center text-black">Добавить позицию</p>
      <TextField
        label={"Имя"}
        size="small"
        color="success"
        sx={{ marginTop: 3, borderColor: "black" }}
        onChange={() => setNewPosition(event.target.value)}
        onSubmit={() => setNewPosition(event.target.value)}
      ></TextField>
      <div className="flex mt-10 justify-center">
        <Button
          sx={{
            color: "black",
            bgcolor: "white",
            ":hover": {
              background: "linear-gradient(to right bottom , #12ed0e, #4697e8)",
              color: "white",
            },
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default AddPosition;
