const mongoose = require("mongoose");

const ProductOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Object,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    customerInfo: {
      type: Object,
      required: true,
    },
    productItems: {
      type: Object,
      required: true,
    },
    orderStatus: {
      type: Object,
      required: true,
    },
    trackingOrder: {
      type: Object,
    },
    totalPrice: {
      type: Object,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
    tran_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductOrder = mongoose.model("Product-Order", ProductOrderSchema);

module.exports = {
  ProductOrder,
};
