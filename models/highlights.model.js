const mongoose = require("mongoose");

const specialDealsSchema = new mongoose.Schema(
  {
    primaryImage: {
      type: Object,
      required: true,
    },
    subTitle: String,
    price: Number,
    title: String,
    link: {
      type: String,
      default: "#",
    },
  },
  { timestamps: true }
);

const kickOnSelectSchema = new mongoose.Schema(
  {
    primaryImage: {
      type: Object,
      required: true,
    },
    title: String,
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
const featuredPhotosSchema = new mongoose.Schema(
  {
    imageOne: Object,
    imageTwo: Object,
    imageThree: Object,
  },
  { timestamps: true }
);

const representProductSchema = new mongoose.Schema(
  {
    title: Object,
    link: Object,
    productsId: [],
    primaryImage: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);
// Celebration at kick one Schema
const celebrationSchema = new mongoose.Schema(
  {
    sectionTitle: String,
    images: [Object],
  },
  { timestamps: true }
);

const SpecialDeals = mongoose.model("SpecialDeals", specialDealsSchema);
const KickOnSelect = mongoose.model("KickOnSelect", kickOnSelectSchema);
const FeaturedPhotos = mongoose.model("FeaturedPhoto", featuredPhotosSchema);
const RepresentProducts = mongoose.model(
  "RepresentProduct",
  representProductSchema
);
const CelebrationAtKickOn = mongoose.model(
  "Celebration-at-Kick-on",
  celebrationSchema
);
module.exports = {
  SpecialDeals,
  KickOnSelect,
  FeaturedPhotos,
  RepresentProducts,
  CelebrationAtKickOn,
};
