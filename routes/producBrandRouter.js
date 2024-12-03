const express = require("express");
const {
  getAllProductBrand,
  createProductBrand,
  deleteProducBrand,
  getProductsByProducBrand,
} = require("../controllers/productBrand");
const verifyAdmin = require("../middlewares/admin.middleware");
const producBrandRouter = express.Router();

producBrandRouter.get("/", getAllProductBrand);
producBrandRouter.post("/", verifyAdmin, createProductBrand);
producBrandRouter.delete("/", verifyAdmin, deleteProducBrand);

producBrandRouter.get("/:id", getProductsByProducBrand);
module.exports = producBrandRouter;
