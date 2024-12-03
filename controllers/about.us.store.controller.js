const mongoose = require("mongoose");
const { AboutUsStore } = require("../models/about.us.store");

const getAllAboutUsStore = async (req, res) => {
  try {
    const data = await AboutUsStore.find({});
    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAboutUsStore = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AboutUsStore.find({ _id: id });

    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createAboutUsStore = async (req, res) => {
  try {
    const categoryData = req.body;

    const result = await AboutUsStore.create({
      ...categoryData,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAboutUsStore = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await AboutUsStore.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateAboutUsStore = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await AboutUsStore.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!data) {
      return res.status(404).json({ status: false, data });
    }
    res.status(200).json({ data, status: true });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllAboutUsStore,
  createAboutUsStore,
  deleteAboutUsStore,
  updateAboutUsStore,
  getAboutUsStore,
};
