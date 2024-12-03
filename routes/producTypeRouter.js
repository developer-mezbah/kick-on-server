const express = require("express");
const {
  getAllProducType,
  createProducType,
  deleteProducType,
  getProductsByProducType,
} = require("../controllers/productType");
const verifyAdmin = require("../middlewares/admin.middleware");
const producBrandRouter = express.Router();

producBrandRouter.get("/", getAllProducType);
producBrandRouter.post("/", verifyAdmin, createProducType);
producBrandRouter.delete("/", verifyAdmin, deleteProducType);

producBrandRouter.get("/:id", getProductsByProducType);
module.exports = producBrandRouter;
