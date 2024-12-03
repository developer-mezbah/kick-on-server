const mongoose = require("mongoose");
const { TopBanner } = require("../models/topBanner");

const getAllTopBanners = async (req, res) => {
  try {
    const data = await TopBanner.find({});
    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTopBanner = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TopBanner.find({ _id: id });
    
    if (!data.length) {
        return res.status(204).json({ status: false, data });
      }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createTopBanner = async (req, res) => {
  try {
    const categoryData = req.body;

    const result = await TopBanner.create({
      ...categoryData,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTopBanner = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await TopBanner.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateTopBanner = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await TopBanner.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllTopBanners,
  createTopBanner,
  deleteTopBanner,
  updateTopBanner,
  getTopBanner,
};
