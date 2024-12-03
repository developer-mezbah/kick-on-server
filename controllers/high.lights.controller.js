const mongoose = require("mongoose");
const {
  SpecialDeals,
  KickOnSelect,
  FeaturedPhotos,
  RepresentProducts,
  CelebrationAtKickOn,
} = require("../models/highlights.model");

const getSpecialDeals = async (req, res) => {
  try {
    const data = await SpecialDeals.find({});
    if (!data.length) {
      const result = await SpecialDeals.create({
        primaryImage: {
          secure_url: "/images/not-found-img.png",
        },
        subTitle: " ",
        title: " ",
        price: 0,
        link: "#",
      });
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateSpecialDeals = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await SpecialDeals.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getKickOnSelect = async (req, res) => {
  try {
    const data = await KickOnSelect.find({});
    if (!data.length) {
      const result = await KickOnSelect.create({
        primaryImage: {
          secure_url: "/images/not-found-img.png",
        },
        title: " ",
        description: " ",
      });
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateKickOnSelect = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await KickOnSelect.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getFeaturedPhotos = async (req, res) => {
  try {
    const data = await FeaturedPhotos.find({});
    if (!data.length) {
      const result = await FeaturedPhotos.create({
        imageOne: {
          secure_url: "/images/not-found-img.png",
        },
        imageTwo: {
          secure_url: "/images/not-found-img.png",
        },
        imageThree: {
          secure_url: "/images/not-found-img.png",
        },
      });
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateFeaturedPhotos = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await FeaturedPhotos.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Represent product functionality
const getRepresentProducts = async (req, res) => {
  try {
    const data = await RepresentProducts.find({});
    if (!data.length) {
      const result = await RepresentProducts.create({
        title: " ",
        link: "#",
        productsId: [],
        primaryImage: {
          secure_url: "/images/not-found-img.png",
        },
      });
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateRepresentProducts = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await RepresentProducts.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteRepresentProduct = async (req, res) => {
  try {
    const id = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid id!" });
    }
    const data = await RepresentProducts.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// End Represent product functionality

// celebration at kick on functionality
const getCelebrationAtKickOn = async (req, res) => {
  try {
    const data = await CelebrationAtKickOn.find({});
    if (!data.length) {
      const result = await CelebrationAtKickOn.create({
        sectionTitle: " ",
        images: [],
      });
      return res.status(201).json({ status: true, data: result });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateCelebrationAtKickOn = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await CelebrationAtKickOn.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Ended celebration at kick on functionality

module.exports = {
  getSpecialDeals,
  updateSpecialDeals,
  getKickOnSelect,
  updateKickOnSelect,
  getFeaturedPhotos,
  updateFeaturedPhotos,
  getRepresentProducts,
  updateRepresentProducts,
  deleteRepresentProduct,
  getCelebrationAtKickOn,
  updateCelebrationAtKickOn
};
