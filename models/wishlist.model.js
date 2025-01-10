const mongoose = require("mongoose");

const wishlistsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Wishlists = mongoose.model("Wishlist", wishlistsSchema);
module.exports = {
  Wishlists,
};
