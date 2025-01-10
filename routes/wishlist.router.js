const express = require("express");
const {
  getAllWishLists,
  createWishList,
  deleteWishList,
  updateWishlist,
} = require("../controllers/wishlist.controller");
const wishlistRouter = express.Router();

wishlistRouter.get("/", getAllWishLists);
wishlistRouter.post("/", createWishList);
wishlistRouter.delete("/", deleteWishList);

wishlistRouter.put("/", updateWishlist);

module.exports = wishlistRouter;
