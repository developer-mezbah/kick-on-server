const express = require("express");
const { orderWithBkash } = require("../controllers/bkashPayment.controller");
const verifyUser = require("../middlewares/user.middleware");
const { order } = require("../controllers/sslCommerz.controller");

const paymentRouter = express.Router();

paymentRouter.post("/order/bkash", orderWithBkash);
paymentRouter.post("/order", order);
// paymentRouter.post("/order/bkash", verifyUser, orderWithBkash);
// paymentRouter.post("/order", verifyUser, order);

module.exports = paymentRouter;
