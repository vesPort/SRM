import { ItemModel } from "../model/Item.js";
import { SupplierModel } from "../model/Supplier.js";

export const addItem = async (req, res) => {
  try {
    const { name } = req.body;

    let newItem = new ItemModel({
      name,
      price: 0,
    });

    const suppliers = await SupplierModel.find();

    let i = 0;
    while (i != suppliers.length) {
      await SupplierModel.findOneAndReplace(
        { name: suppliers[i].name },
        {
          name: suppliers[i].name,
          items: suppliers[i].items.concat(newItem),
        }
      );

      i++;
    }

    console.log(suppliers);
    await newItem.save();
    res.json({ message: "Item added", newItem, suppliers });
  } catch (error) {
    console.log("Cannot add item to main items", error);
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findById(id);

    res.json({ message: "Item founded", item });
  } catch (error) {
    console.log("Cannot get item", error);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find();

    res.json({ message: "Item founded", items });
  } catch (error) {
    console.log("Cannot get items", error);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findByIdAndDelete(id);

    const suppliers = await SupplierModel.find();

    let i = 0;
    while (i != suppliers.length) {
      const supplierItems = suppliers[i].items;
      supplierItems.splice(supplierItems.indexOf(item), 1);

      await SupplierModel.findOneAndReplace(
        { name: suppliers[i].name },
        {
          name: suppliers[i].name,
          items: supplierItems,
        }
      );

      i++;
    }

    res.json({ message: "Item deleted", item });
  } catch (error) {
    console.log("Cannot delete item", error);
  }
};

// export const setPrice = async (req, res) => {
//   try {
//     const 
//   }
// }