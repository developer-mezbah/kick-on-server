const express = require("express");
const { order } = require("../controllers/payment.controller");
const verifyUser = require("../middlewares/user.middleware");

const paymentRouter = express.Router();

paymentRouter.post("/order", verifyUser, order);

module.exports = paymentRouter;
