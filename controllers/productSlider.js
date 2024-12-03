const mongoose = require("mongoose");
const { ProductSlider } = require("../models/productSlider");

const getAllProductSlider = async (req, res) => {
  try {
    const data = await ProductSlider.find({});
    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProductSlider = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductSlider.find({ _id: id });

    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProductSlider = async (req, res) => {
  try {
    const categoryData = req.body;

    const result = await ProductSlider.create({
      ...categoryData,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductSlider = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await ProductSlider.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProductSlider = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await ProductSlider.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json({data, status: true});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProductSlider,
  createProductSlider,
  deleteProductSlider,
  updateProductSlider,
  getProductSlider,
};
