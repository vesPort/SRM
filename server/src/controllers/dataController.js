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
        if (supplier.accessorKey !== "position" && supplier.accessorKey !== "позиции")
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
  const { _id, index, id, value } = req.body;

  const data = await Data.findById(_id);

  const tableData = data.data;

  const position = tableData[index]["position"];

  const positionKeys = Object.keys(position);

  const keyForChange = positionKeys[id];

  const updatedPosition = (position[keyForChange] = value);

  console.log(tableData);

  const updatedData = await Data.findByIdAndUpdate(
    { _id },
    {
      $set: { data: tableData },
    }
  );

  res.json({ data: tableData });
};

export { getAllData, addPosition, setPrice };
