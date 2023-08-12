import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import state from "../store";

const AddSupplierForm = ({ updateTable }) => {
  const [newSupplier, setNewSupplier] = useState("");

  const handleSubmit = async () => {
    const accessorKey = newSupplier.toLowerCase();

    state.suppliers.push({
      header: newSupplier,
      accessorKey: accessorKey,
    });
    state.suppliers.push({
      header: newSupplier + " З",
      accessorKey: accessorKey + "Z",
    });
    state.suppliers.push({
      header: newSupplier + " В",
      accessorKey: accessorKey + "D",
    });
    state.data.map((item) => {
      item[`${accessorKey}`] = 0;
      item[`${accessorKey}Z`] = 0;
      item[`${accessorKey}D`] = 0;
    });

    const databaseSupplier = { header: newSupplier };

    await axios.post(
      `${state.baseUrl}/${state.id}/addSupplier`,
      databaseSupplier
    );
    state.addingSupplier = false;
    setNewSupplier("");
    updateTable();
  };

  return (
    <div className="h-52">
      <p className="text-lg flex justify-center">Добавить поставщика</p>
      <TextField
        label={"Имя"}
        size="small"
        color="success"
        sx={{ marginTop: 3, borderColor: "black" }}
        onChange={() => setNewSupplier(event.target.value)}
      ></TextField>
      <div className="flex mt-10 justify-center">
        <Button
          sx={{
            color: "gray",
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

export default AddSupplierForm;
