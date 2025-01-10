const express = require("express");
const {
  getDeleveryInfo,
  createDeleveryInfo,
  deleteDeleveryInfo,
  updateDeleveryInfo,
} = require("../controllers/deleveryInfo.controller");
const verifyUser = require("../middlewares/user.middleware");
const deleveryInfoRouter = express.Router();

deleveryInfoRouter.get("/", verifyUser, getDeleveryInfo);
deleveryInfoRouter.post("/", verifyUser, createDeleveryInfo);
deleveryInfoRouter.delete("/", verifyUser, deleteDeleveryInfo);
deleveryInfoRouter.put("/", verifyUser, updateDeleveryInfo);

module.exports = deleveryInfoRouter;
