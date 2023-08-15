import Data from "../schemas/DataSchema.js";

const getAllData = async (req, res) => {
  const _id = req.params.id;
  try {
    const allData = await Data.findById(_id);

    const tableData = allData.data;

    res.json(tableData);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getListIds = async (req, res) => {
  let ids = [];
  try {
    const documents = await Data.find();
    documents.map((document) => {
      ids.push(document._id);
    });

    res.json({ ids: ids });
  } catch (error) {
    res.json({ message: "Error get all _id" });
  }
};

const addPosition = async (req, res) => {
  const _id = req.params.id;
  const { position } = req.body;

  const data = await Data.findById(_id);
  const positions = data.positions;

  console.log(positions);

  if (!positions.includes(position)) {
    await Data.findByIdAndUpdate(
      _id,
      {
        $push: { positions: position },
      },
      { new: true }
    );

    try {
      const data = await Data.findById(_id);
      const suppliers = data.suppliers;

      const newPosition = { position: position, позиции: position };

      suppliers.map((supplier) => {
        if (
          supplier.accessorKey !== "position" &&
          supplier.accessorKey !== "позиции"
        )
          newPosition[`${supplier.accessorKey}`] = 0;
      });

      const allData = await Data.findByIdAndUpdate(_id, {
        $push: {
          data: newPosition,
        },
      });

      res.json({ data: allData });
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json({ message: "Position exists" });
  }
};

const setPrice = async (req, res) => {
  const _id = req.params.id;
  const { index, id, value } = req.body;

  const data = await Data.findById(_id);

  const tableData = data.data;

  const position = tableData[index];

  const positionKeys = Object.keys(tableData[index]);

  const updatedPosition = (position[id] = parseFloat(value));

  const updatedData = await Data.findByIdAndUpdate(
    { _id },
    {
      $set: { data: tableData },
    }
  );

  res.json({ data: tableData });
};

const copyAndCreateNewCollectionNextWeek = async (req, res) => {
  const _id = req.params.id;
  const previosDocument = await Data.findById(_id);
  let newDB;

  if (previosDocument) {
    const newData = previosDocument.data.map((item) => {
      const newItem = {};
      const keys = Object.keys(item);

      keys.forEach((key) => {
        if (key.endsWith("Z") || key.endsWith("D")) {
          newItem[`${key}`] = 0;
        } else {
          newItem[`${key}`] = item[`${key}`];
        }
      });

      return newItem;
    });

    console.log(newData);

    const newDocument = new Data({
      carList: [],
      data: newData,
      addingPosition: false,
      addingSupplier: false,
      positions: previosDocument.positions,
      suppliers: previosDocument.suppliers,
    });

    newDB = await newDocument.save();

    console.log("New DB created");
  }

  res.json({ newId: newDB._id });
};

export {
  getAllData,
  addPosition,
  setPrice,
  copyAndCreateNewCollectionNextWeek,
  getListIds
};
