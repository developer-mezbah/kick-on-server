const mongoose = require("mongoose");
const { Product, ProductTypeName } = require("../models/product");


const getAllProducType = async (req, res) => {
  try {
    const data = await ProductTypeName.find({});
    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProductsByProducType = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.find({ productTypeId: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProducType = async (req, res) => {
  try {
    const categoryData = req.body;
    
    const result = await ProductTypeName.create({
      ...categoryData,
    });
    res.status(201).json({status: true, data: result});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProducType = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await ProductTypeName.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProducType = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await ProductCategory.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProducType,
  createProducType,
  deleteProducType,
  updateProducType,
  getProductsByProducType,
};