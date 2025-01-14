const mongoose = require("mongoose");
const { ProductOrder } = require("../models/product-order.model");

const getOrders = async (req, res) => {
  try {
    const id = req.query.customer_id;
    const data = await ProductOrder.find({ customerId: id }).sort({
      createdAt: -1,
    });
    if (!data.length) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const data = await ProductOrder.find({}).sort({ createdAt: -1 });
    if (!data.length) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const reqBody = req.body;
    function generateOrderId() {
      const min = 10000000000; // Smallest 11-digit number
      const max = 99999999999; // Largest 11-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const result = await ProductOrder.create({
      orderId: generateOrderId(),
      ...reqBody,
      paymentStatus: false,
      orderStatus: "processing",
    });
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await ProductOrder.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await ProductOrder.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getOrders,
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
};
