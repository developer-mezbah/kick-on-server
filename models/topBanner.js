const mongoose = require("mongoose");

const topBanner = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TopBanner = mongoose.model("top-banner", topBanner);
module.exports = {
  TopBanner,
};
