const mongoose = require("mongoose");
const { Wishlists } = require("../models/wishlist.model");
const { Product } = require("../models/product");

const getAllWishLists = async (req, res) => {
  try {
    const userId = req.query.userId;

    const data = await Wishlists.find({ userId });
    const productsid = data?.map((item) => item?.productId);
    let products = await Product.find({ _id: { $in: productsid } });
//     products.wishlistId = 
// console.log(data[0]?._id);

    if (!data.length) {
      return res.status(204).json({ status: false, data });
    }
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createWishList = async (req, res) => {
  try {
    const reqBody = req.body;

    const result = await Wishlists.create({
      ...reqBody,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWishList = async (req, res) => {
  try {
    const userId = req.query.userId;
    const productId = req.query.productId;
    
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({ error: "Invalid id!" });
    // }
    const data = await Wishlists.findOneAndDelete({ userId, productId });

    if (data === null) {
        return res.status(200).json({ status: false });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateWishlist = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Wishlists.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllWishLists,
  createWishList,
  deleteWishList,
  updateWishlist,
};
