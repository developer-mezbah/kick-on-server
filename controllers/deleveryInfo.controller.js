const mongoose = require("mongoose");
const { DeleverInfo } = require("../models/deliveryInfo.model");

const getDeleveryInfo = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await DeleverInfo.find({ userId: id });
    if (!data.length) {
      return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createDeleveryInfo = async (req, res) => {
  try {
    const reqBody = req.body;

    const result = await DeleverInfo.create({
      ...reqBody,
    });
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDeleveryInfo = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await DeleverInfo.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateDeleveryInfo = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await DeleverInfo.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDeleveryInfo,
  createDeleveryInfo,
  deleteDeleveryInfo,
  updateDeleveryInfo,
};
