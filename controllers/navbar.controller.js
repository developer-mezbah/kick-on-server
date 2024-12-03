const { NavbarItem, Logo } = require("../models/navbar.model");
const mongoose = require("mongoose");

const getNavItems = async (req, res) => {
  try {
    const data = await NavbarItem.find({}).sort({ _id: 1 });
    if (!data.length) {
      // Create 10 data
      const newObjects = Array.from({ length: 10 }, (_, i) => ({}));
      const result = await NavbarItem.insertMany(newObjects);
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message, status: false });
  }
};

const createNavItem = async (req, res) => {
  try {
    const reqBody = req.body;
    const result = await NavbarItem.create({
      ...reqBody,
    });
    if (!result) {
      return res.status(404).json({ error: "Data is not Created" });
    }
    res.status(201).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNavItem = async (req, res) => {
  try {
    const id = req.query.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await NavbarItem.findOneAndDelete({ _id: id });
    if (!data) {
      return res.status(404).json({ error: "Data is not Created" });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateNavItems = async (req, res) => {
  try {
    const id = req.query.id;

    const result = await NavbarItem.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    
    if (!result) {
      res.status(404).json({ error: "Data is not Created" });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


// Logo query
const getLogo = async (req, res) => {
  try {
    const data = await Logo.find({});
    if (!data.length) {
      const result = await Logo.create({});
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateLogo = async (req, res) => {
  try {
    const id = req.query.id;
    
    const data = await Logo.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getNavItems,
  createNavItem,
  deleteNavItem,
  updateNavItems,
  getLogo,
  updateLogo
};
