import { Button, IconButton, MenuItem, Select } from "@mui/material";
import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";

const CreateCar = () => {
  const snap = useSnapshot(state);
  return (
    <div>
      <div className="flex justify-between">
        <div>Destination</div>
        <div>Weight</div>
      </div>
      <div className="flex justify-between">
        <div>Summary</div>
        <div className="">Summ</div>
      </div>
      <div className="flex justify-around">
        <Select>
          {snap.suppliers.map((supplier) => {
            if (supplier.header !== "Позиции") {
              if (!supplier.accessorKey.endsWith("Z")) {
                if (!supplier.accessorKey.endsWith("D")) {
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
          })}
        </Select>
        <Select></Select>
      </div>
      <div className="flex justify-around mt-5 mb-5">
        <Button>Add</Button>
      </div>
    </div>
  );
};

export default CreateCar;
