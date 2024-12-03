const { Product, ProductCategory, ProductTypeName, BrandName } = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ createdAt: -1 });
    if (!data) {
      res.status(404).json({ error: "Data is not Created" });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message, status: false });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const result = await Product.create({
      ...productData,
    });
    if (!result) {
      res.status(404).json({ error: "Data is not Created" });
    }
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.query.id;

    const data = await Product.findOneAndDelete({ _id: id });

    if (!data) {
      res.status(404).json({ error: "Data is not Created" });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.query.id;

    const result = await Product.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!result) {
      res.status(404).json({ error: "Data is not Created" });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const productResource = async (req, res) => {
  try {
    const productCategory = await ProductCategory.find({}).sort({ _id: -1 });
    const producType = await ProductTypeName.find({}).sort({ _id: -1 });
    const productBrand = await BrandName.find({}).sort({ _id: -1 });

    res
      .status(200)
      .json({
        status: true,
        data: {productCategory, producType, productBrand},
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  productResource
};
