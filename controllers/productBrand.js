const mongoose = require("mongoose");
const { Product, BrandName } = require("../models/product");

const getAllProductBrand = async (req, res) => {
  try {
    const data = await BrandName.find({});
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProductsByProducBrand = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    
    const data = await Product.find({ brandNameId: id });
    res.status(200).json({ status: true, data });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProductBrand = async (req, res) => {
  try {
    const categoryData = req.body;

    const result = await BrandName.create({
      ...categoryData,
    });
    res.status(201).json({status: true, data: result});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProducBrand = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await BrandName.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProducBrand = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await BrandName.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProductBrand,
  createProductBrand,
  deleteProducBrand,
  updateProducBrand,
  getProductsByProducBrand,
};
