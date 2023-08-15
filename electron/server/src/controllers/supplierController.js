import Data from "../schemas/DataSchema.js";

const getSuppliers = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Data.findById(id);

    const suppliers = data["suppliers"];

    res.json(suppliers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const addSupplier = async (req, res) => {
  const _id = req.params.id;
  const { header } = req.body;

  const data = await Data.findOne({
    _id: _id,
  });

  const supplier = data.suppliers.find((supp) => supp.header === header);
  const positions = data["data"];

  if (!supplier) {
    const newSupplier = [
      { header: header, accessorKey: header.toLowerCase() },

      {
        header: header + "D",
        accessorKey: header.toLowerCase() + "D",
      },
      {
        header: header + "Z",
        accessorKey: header.toLowerCase() + "Z",
      },
    ];

    const accessorKeys = newSupplier.map((supp) => supp.accessorKey);

    const data = await Data.findByIdAndUpdate(_id, {
      $push: { suppliers: { $each: newSupplier } },
    });

    // if (positions.length > 0) {
    //   const updatedPositions = positions.map((pos, i) => {
    //     // const newPosition = pos.position;
    //     // accessorKeys.map((key) => (newPosition[`${key}`] = 0));
    //     if (!pos[i] === "position" && !pos[i] === "позиции") {
    //       const newPosition = { ...pos };
    //       accessorKeys.forEach((key) => {
    //         newPosition[key] = 0;
    //       });
    //       return newPosition;
    //     } else {
    //       return pos; // Если не является объектом, вернуть без изменений
    //     }
    //   });
    let newPositions = [];

    if (positions.length > 0) {
      positions.map((position) => {
        const newPosition = { ...position };
        accessorKeys.forEach((key) => (newPosition[key] = 0));

        newPositions.push(newPosition);
      });
    }

    const updatedData = await Data.findByIdAndUpdate(
      _id,
      {
        $set: {
          data: newPositions,
        },
      },
      { new: true }
    );

    res.json({ data: data });
  } else {
    res.json({ message: "Supplier already exists" });
  }
};

const deleteSupplier = async (req, res) => {
  const { _id, header } = req.body;
  try {
    const data = await Data.findOne({
      _id: _id,
    });

    const positions = data.data.map((item) => item.position);
    const supplier = data.suppliers.find((supp) => supp.header === header);

    if (supplier) {
      const suppliersHeadersForDelete = [header, header + "D", header + "Z"];

      const data = await Data.findByIdAndUpdate(_id, {
        $pull: {
          suppliers: { header: { $in: suppliersHeadersForDelete } },
        },
      });

      if (positions.length > 0) {
        if (supplier) {
          const suppliersHeadersForDelete = [
            header.toLowerCase(),
            header.toLowerCase() + "D",
            header.toLowerCase() + "Z",
          ];

          const newItems = data.data.map((item, i) => {
            const newPosition = { ...item.position };

            suppliersHeadersForDelete.forEach((field) => {
              if (newPosition.hasOwnProperty(field)) delete newPosition[field];
            });

            return { position: newPosition };
          });

          await Data.updateMany(
            {
              _id: _id,
            },
            {
              $set: {
                data: newItems,
              },
            }
          );
        }
      }

      res.json({ message: `Supplier ${header} deleted` });
    } else {
      res.json({ message: `Supplier ${header} not found` });
    }
  } catch (err) {
    res.json({ message: err.message });
  }
};

export { addSupplier, deleteSupplier, getSuppliers };
