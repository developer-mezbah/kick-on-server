const mongoose = require("mongoose");

const productSlider = new mongoose.Schema(
  {
    primaryImage: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductSlider = mongoose.model("product-slider", productSlider);
module.exports = {
  ProductSlider,
};
