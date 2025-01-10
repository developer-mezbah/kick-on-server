const express = require("express");
const { order } = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/order", order);

module.exports = paymentRouter;
