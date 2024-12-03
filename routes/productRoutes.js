const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
} = require("../controllers/product");
const verifyAdmin = require("../middlewares/admin.middleware");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", verifyAdmin, createProduct);
productRouter.delete("/", verifyAdmin, deleteProduct);
productRouter.put("/", verifyAdmin, updateProduct);
productRouter.get("/:id", getSingleProduct);

module.exports = productRouter;
