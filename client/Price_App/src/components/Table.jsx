import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import data from "../moch_data";
import { AddSupplierForm } from "../components/index";

import { useSnapshot } from "valtio";
import state from "../store";
import { Button } from "@mui/material";

const Table = () => {
  const snap = useSnapshot(state);
  const [tableData, setTableData] = useState(() => data);
  const [newSupplier, setNewSupplier] = useState("");
  // const [adding, setAdding] = useState(false);

  const suppliers = [
    { header: "Позиции", accessorKey: "position" },
    { header: "Agro", accessorKey: "agro" },
    { header: "Kur", accessorKey: "kur" },
  ];

  const handleSaveCell = (cell, value) => {
    tableData[cell.row.index][cell.column.id] = value;
    //send/receive api updates here
    setTableData([...tableData]);
    state.data = [...tableData];
  };

  return (
    <div>
      {snap.addingSupplier && (
        <div className="flex justify-center mt-60 border-solid border-2 border-gray-700 bg-gray-500 text-white m-3 rounded-md">
          <AddSupplierForm />
        </div>
      )}
      {!snap.addingSupplier && (
        <MaterialReactTable
          renderTopToolbarCustomActions={() => (
            <Button
              sx={{
                color: "gray",
                bgcolor: "white",
                ":hover": { bgcolor: "gray", color: "white" },
              }}
              variant="contained"
              onClick={() => (state.addingSupplier = true)}
            >
              Добавить поставщика
            </Button>
          )}
          data={tableData}
          columns={suppliers.map((data) => data)}
          enableStickyHeader
          muiTableContainerProps={{
            sx: { minHeight: "85vh", maxHeight: "85vh" },
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: [25, 100],
            labelRowsPerPage: "",
          }}
          enableEditing
          editingMode="cell"
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onChange: (event) => {
              handleSaveCell(cell, event.target.value);
            },
          })}
        />
      )}
    </div>
  );
};

export default Table;
