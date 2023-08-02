import { Button, TextField } from "@mui/material";
import React from "react";
import state from "../store";

const AddSupplierForm = () => {
  const handleSubmit = () => {

    state.addingSupplier = false;
  };

  return (
    <div className="h-52">
      <p className="text-lg flex justify-center">Добавить поставщика</p>
      <TextField
        label={"Имя"}
        size="small"
        sx={{ marginTop: 3, borderColor: "black" }}
      ></TextField>
      <div className="flex mt-10 justify-center">
        <Button
          sx={{
            color: "gray",
            bgcolor: "white",
            ":hover": { bgcolor: "gray", color: "white" },
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
