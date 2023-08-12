import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { AddSupplierForm } from "../components/index";

import { useSnapshot } from "valtio";
import state from "../store";
import { Button } from "@mui/material";
import AddPosition from "./AddPosition";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

const Table = () => {
  const snap = useSnapshot(state);
  const [tableData, setTableData] = useState(snap.data);
  const [addingPosition, setAddingPosition] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [forceUpdateSupplier, setForceUpdateSupplier] = useState(false);
  const [forceUpdatePosition, setForceUpdatePosition] = useState(false);

  // const suppliers = state.suppliers;
  // console.log({suppliers})
  const handleUpdateTableSupplier = () => {
    setForceUpdateSupplier(!forceUpdateSupplier);
  };

  const handleUpdateTablePosition = () => {
    setForceUpdatePosition(!forceUpdatePosition);
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataResponse = await axios.get(`${snap.baseUrl}/data/${snap.id}`);
      const suppliersResponce = await axios.get(
        `${snap.baseUrl}/${snap.id}/getSuppliers`
      );

      state.data = dataResponse.data;
      state.suppliers = suppliersResponce.data;

      setTableData(dataResponse.data);
      setSuppliers(suppliersResponce.data);
    };

    console.log("sup lag");

    fetchData();
  }, [forceUpdateSupplier, forceUpdatePosition]);

  const handleSaveCell = (cell, value) => {
    state.data[cell.row.index][cell.column.id] = value;
    setTableData([...state.data]);
    // setTableData(tableData[cell.row.index][cell.column.id] = value);
    //send/receive api updates here
  };

  const handleDeleteRow = (row) => {
    if (!confirm("Вы точно хотите удалить данную строку?")) return;

    state.data.splice(row.index, 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-900 to-gray-100 ">
      <div className="flex justify-around">
        {snap.addingSupplier && (
          <div className="flex justify-center mt-60 border-solid border-2 border-gray-700 bg-gradient-to-r from-gray-200 to-gray-600 text-black m-3 rounded-md  max-w-lg w-2/3">
            <AddSupplierForm updateTable={handleUpdateTableSupplier} />
          </div>
        )}
        {snap.addingPosition && (
          <div className="flex justify-center mt-60 border-solid border-2 border-gray-700 bg-gradient-to-r from-gray-200 to-gray-600 text-white m-3 rounded-md max-w-lg w-2/3">
            <AddPosition updateTable={handleUpdateTablePosition} />
          </div>
        )}
      </div>
      {!snap.addingSupplier && !snap.addingPosition && (
        <MaterialReactTable
          muiTopToolbarProps={{
            sx: {
              background: "linear-gradient(to right, #1b1c33, #ededf0)",
            },
          }}
          renderTopToolbarCustomActions={() => (
            <div className="flex">
              <Button
                sx={{
                  color: "black",
                  bgcolor: "white",
                  ":hover": {
                    background:
                      "linear-gradient(to right bottom, #430089, #82ffa1)",
                    color: "white",
                  },
                }}
                variant="contained"
                onClick={() => (state.addingSupplier = true)}
              >
                Добавить поставщика
              </Button>
              <Button
                sx={{
                  marginLeft: 2,
                  color: "black",
                  bgcolor: "white",
                  ":hover": {
                    background:
                      "linear-gradient(to right bottom, #430089, #82ffa1)",
                    color: "white",
                  },
                }}
                variant="contained"
                onClick={() => {
                  setAddingPosition(true);
                  state.addingPosition = true;
                }}
              >
                Добавить позицию
              </Button>
            </div>
          )}
          data={tableData}
          columns={suppliers.map((data) => data)}
          enableStickyHeader
          enableBottomToolbar={false}
          muiTableContainerProps={{
            sx: { minHeight: "94vh", maxHeight: "94vh" },
          }}
          defaultColumn={{ size: 100, maxSize: 100 }}
          enableEditing
          enablePagination={false}
          editingMode="cell"
          muiTableBodyCellEditTextFieldProps={({ cell }) => ({
            //onBlur is more efficient, but could use onChange instead
            onBlur: (event) => {
              handleSaveCell(cell, event.target.value);
            },
          })}
        />
      )}
    </div>
  );
};

export default Table;
