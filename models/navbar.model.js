const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema(
  {
    name: String,
    href: String,
    dropDown: Object,
  },
  { timestamps: true }
);

const logoSchema = new mongoose.Schema(
  {
    logo: {
      type: Object,
    },
    altText: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  { timestamps: true }
);

const NavbarItem = mongoose.model("Nabar-item", NavbarSchema);
const Logo = mongoose.model("Logo", logoSchema);

module.exports = {
  NavbarItem,
  Logo,
};
