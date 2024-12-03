const mongoose = require("mongoose");
const { Product, ProductCategory } = require("../models/product");


const getAllCategories = async (req, res) => {
  try {
    const data = await ProductCategory.find({});
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProductsByCategories = async (req, res) => {
  try {
    const id = req.params.id;
    
    const data = await Product.find({ categoryId: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    
    const result = await ProductCategory.create({
      ...categoryData,
    });
    res.status(201).json({status: true, data: result});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await ProductCategory.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await ProductCategory.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getProductsByCategories,
};