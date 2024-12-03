const mongoose = require("mongoose");
const { AboutUsStore } = require("../models/about.us.store");
const { TopBanner } = require("../models/topBanner");
const { ProductSlider } = require("../models/productSlider");
const { Footer } = require("../models/footer.model");
const {
  SpecialDeals,
  KickOnSelect,
  FeaturedPhotos,
  RepresentProducts,
  CelebrationAtKickOn,
} = require("../models/highlights.model");
const { Product, ProductCategory } = require("../models/product");
const { NavbarItem, Logo } = require("../models/navbar.model");

const getAllHomeData = async (req, res) => {
  try {
    const aboutUsStoreData = await AboutUsStore.find({});
    const topBannarData = await TopBanner.find({});
    const productSliderData = await ProductSlider.find({});
    const footerData = await Footer.find({});
    const specialDealsData = await SpecialDeals.find({});
    const productData = await Product.find({}).sort({ createdAt: -1 });
    const categoryData = await ProductCategory.find({});
    const kickOnSelectData = await KickOnSelect.find({});
    const featuredPhotos = await FeaturedPhotos.find({});

    const representProducts = await RepresentProducts.find({});
    const newRePresentProducts = await Product.find({
      _id: { $in: representProducts[0]?.productsId },
    });

    const celebrationData = await CelebrationAtKickOn.find({});
    const navbarData = await NavbarItem.find({}).sort({ _id: 1 });
    const logoData = await Logo.find({});
    const data = {
      aboutUsStoreData: aboutUsStoreData[0],
      topBannarData,
      productSliderData,
      footerData: footerData[0],
      specialDealsData: specialDealsData[0],
      productData,
      categoryData,
      kickOnSelectData: kickOnSelectData[0],
      featuredPhotos: featuredPhotos[0],
      representProducts: {
        representProducts: representProducts[0],
        products: newRePresentProducts,
      },
      celebrationData: celebrationData[0],
      navbarData,
      logoData: logoData[0]
    };
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllHomeData,
};
