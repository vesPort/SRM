import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { AddSupplierForm } from "../components/index";
import CircularProgress from "@mui/material/CircularProgress";

import { useSnapshot } from "valtio";
import state from "../store";
import { Button, MenuItem, Select } from "@mui/material";
import AddPosition from "./AddPosition";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";

const Table = () => {
  const snap = useSnapshot(state);
  const [tableData, setTableData] = useState(snap.data);
  const [addingPosition, setAddingPosition] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [forceUpdateSupplier, setForceUpdateSupplier] = useState(false);
  const [forceUpdatePosition, setForceUpdatePosition] = useState(false);
  const [forceUpdateNewTAble, setForceUpdateNewTable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [tablesId, setTablesId] = useState([]);

  // const suppliers = state.suppliers;
  // console.log({suppliers})
  const handleUpdateTableSupplier = () => {
    setIsFetching(true);
    setForceUpdateSupplier(!forceUpdateSupplier);
    setIsFetching(false);
  };

  const handleUpdateTablePosition = () => {
    setIsFetching(true);
    setForceUpdatePosition(!forceUpdatePosition);
    setIsFetching(false);
  };

  const handleCreateTable = async () => {
    setIsFetching(true);

    await axios
      .post(`${snap.baseUrl}/${snap.id}/data/newDoc`)
      .then((res) => (state.id = res.data.newId));

    setForceUpdateNewTable(!forceUpdateNewTAble);
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const ids = await axios.get(`${snap.baseUrl}/data/idList`);
      const dataResponse = await axios.get(`${snap.baseUrl}/data/${snap.id}`);
      const suppliersResponce = await axios.get(
        `${snap.baseUrl}/${snap.id}/getSuppliers`
      );

      state.data = dataResponse.data;
      state.suppliers = suppliersResponce.data;

      setTableData(dataResponse.data);
      setSuppliers(suppliersResponce.data);
      setTablesId(ids.data.ids);
    };

    console.log(tablesId);

    setIsFetching(true);
    fetchData();
    setIsFetching(false);
  }, [
    forceUpdateSupplier,
    forceUpdatePosition,
    forceUpdateNewTAble,
    isFetching,
    snap.id,
  ]);

  const handleSaveCell = async (cell, value) => {
    state.data[cell.row.index][cell.column.id] = value;
    setTableData([...state.data]);

    const setPriceToCell = {
      index: cell.row.index,
      id: cell.column.id,
      value: value,
    };

    setIsFetching(true);
    await axios.post(
      `${snap.baseUrl}/data/${snap.id}/setPrice`,
      setPriceToCell
    );

    setIsFetching(false);

    // setTableData(tableData[cell.row.index][cell.column.id] = value);
    //send/receive api updates here
  };

  const handleDeleteRow = (row) => {
    if (!confirm("Вы точно хотите удалить данную строку?")) return;

    state.data.splice(row.index, 1);
  };

  return isFetching ? (
    <div className="flex justify-center items-center min-h-screen">
      <CircularProgress sx={{ color: "red" }} />
    </div>
  ) : (
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
                onClick={() => handleCreateTable()}
              >
                <AddBoxIcon sx={{ mr: 2 }} />
                Создать таблицу
              </Button>
            </div>
          )}
          muiBottomToolbarProps={{
            sx: { flex: "flex", justifyContent: "end" },
          }}
          renderBottomToolbarCustomActions={() => (
            <div className="flex items-center">
              <Select
                onChange={(evt) => {
                  state.id = evt.target.value;
                }}
              >
                {tablesId.map((id, i) => {
                  const menuItemHeaders = [
                    "Сегодня",
                    "Прошлая неделя",
                    "2 недели назад",
                    "3 недели назад",
                  ];

                  return (
                    <MenuItem key={id} value={id}>
                      {menuItemHeaders[i]}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          )}
          data={tableData}
          columns={suppliers.map((data) => data)}
          enableStickyHeader
          enableBottomToolbar={true}
          muiTableContainerProps={{
            sx: { minHeight: "82vh", maxHeight: "82vh" },
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
