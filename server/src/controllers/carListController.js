import Data from "../schemas/DataSchema.js";

const getCarList = async (req, res) => {
  const id = req.params.id;
  const data = await Data.findById(id);

  const carList = data.carList;

  res.json(carList);
};

const addCar = async (req, res) => {
  const id = req.params.id;
  const { destination, items } = req.body;

  let summary = 0;
  let weight = 0;

  await items.map((item, i) => {
    if (i > 0) {
      summary += parseFloat(item.price) * parseFloat(item.quantity);
      weight += parseFloat(item.quantity);
    }
  });

  const newCarList = await Data.findByIdAndUpdate(
    id,
    {
      $push: {
        carList: {
          destination: destination,
          summary: summary.toLocaleString("en-US"),
          weight: weight.toLocaleString("en-US"),
          items: items,
        },
      },
    },
    { new: true }
  );

  res.json(newCarList);
};

const deleteCar = async (req, res) => {
  const id = req.params.id;
  const { item } = req.body;
  const data = await Data.findByIdAndUpdate(
    id,
    { $pull: { carList: item[0] } },
    { new: true }
  );

  res.json(data);
};

export { getCarList, addCar, deleteCar };
