const express = require("express");
const verifyUser = require("../middlewares/user.middleware");
const verifyAdmin = require("../middlewares/admin.middleware");
const {
  getOrders,
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/product.order.controller");
const productOrdeRouter = express.Router();

productOrdeRouter.get("/", verifyUser, getOrders);
productOrdeRouter.post("/", verifyUser, createOrder);

// Admin can access
productOrdeRouter.get("/all", verifyAdmin, getAllOrders);
productOrdeRouter.delete("/", verifyAdmin, deleteOrder);
productOrdeRouter.put("/", verifyAdmin, updateOrder);

module.exports = productOrdeRouter;
