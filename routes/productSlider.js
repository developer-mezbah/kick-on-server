const express = require("express");
const {
  getAllProductSlider,
  createProductSlider,
  deleteProductSlider,
  updateProductSlider,
  getProductSlider,
} = require("../controllers/productSlider");
const verifyAdmin = require("../middlewares/admin.middleware");
const productSlider = express.Router();

productSlider.get("/", getAllProductSlider);
productSlider.post("/", verifyAdmin, createProductSlider);
productSlider.delete("/", verifyAdmin, deleteProductSlider);

productSlider.put("/", verifyAdmin, updateProductSlider);

productSlider.get("/:id", getProductSlider);
module.exports = productSlider;
