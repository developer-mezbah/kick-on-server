const express = require("express");
const { getAllCategories, createCategory, deleteCategory, updateCategory,getProductsByCategories } = require("../controllers/category");
const verifyAdmin = require("../middlewares/admin.middleware");
const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories)
categoryRouter.post("/", verifyAdmin, createCategory)
categoryRouter.delete("/", verifyAdmin, deleteCategory)

categoryRouter.get("/:id", getProductsByCategories)
module.exports = categoryRouter;