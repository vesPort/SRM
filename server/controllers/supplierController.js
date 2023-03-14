import { ItemModel } from "../model/Item.js";
import { SupplierModel } from "../model/Supplier.js";

export const addSupplier = async (req, res) => {
  try {
    const { name } = req.body;
    const items = await ItemModel.find();

    const newSupplier = new SupplierModel({
      name,
      items,
    });

    await newSupplier.save();
    res.json({ message: "Supplier added", newSupplier });
  } catch (error) {
    console.log(error, "Cannot add supplier");
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    await SupplierModel.findByIdAndDelete(id);
    res.json({
      message: "Supplier deleted",
    });
  } catch (error) {
    console.log(error, "Cannot delete supplier");
  }
};

export const getSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await SupplierModel.findById(id);
    res.json({
      message: "Supplier founded",
      supplier: {
        name: supplier.name,
        items: supplier.items,
      },
    });
  } catch (error) {
    console.log(error, "Cannot find supplier");
  }
};

export const addItem = async (req, res) => {};

export const renameSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    const oldSupplier = await SupplierModel.findById(id);
    const newSupplier = await SupplierModel.findByIdAndUpdate(id, {
      name: newName,
      items: oldSupplier.items,
    });

    res.json({
      message: "Supplier updated",
      oldSupplier,
      newSupplier: {
        name: newName,
        items: oldSupplier.items,
        id: oldSupplier._id,
      },
    });
  } catch (error) {
    console.log(error, "Cannot rename supplier");
  }
};
