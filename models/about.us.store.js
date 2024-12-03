const mongoose = require("mongoose");

const aboutUsStoreSchema = new mongoose.Schema(
  {
    primaryImage: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    direction: {
      type: String,
    },
    timeAndNumber: {
      type: [Object],
    },
  },
  { timestamps: true }
);

const AboutUsStore = mongoose.model("about-us-store", aboutUsStoreSchema);
module.exports = {
    AboutUsStore,
};
