const express = require("express");
const {
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
  updateCelebrationAtKickOn,
} = require("../controllers/high.lights.controller");
const verifyAdmin = require("../middlewares/admin.middleware");
const highLights = express.Router();

highLights.get("/special-deals", getSpecialDeals);
highLights.put("/special-deals", verifyAdmin, updateSpecialDeals);

highLights.get("/kickon-select", getKickOnSelect);
highLights.put("/kickon-select", verifyAdmin, updateKickOnSelect);

highLights.get("/featured-photos", getFeaturedPhotos);
highLights.put("/featured-photos", verifyAdmin, updateFeaturedPhotos);

highLights.get("/represent-products", getRepresentProducts);
highLights.put("/represent-products", verifyAdmin, updateRepresentProducts);
highLights.delete("/represent-products", verifyAdmin, deleteRepresentProduct);

highLights.get("/celebration-at-kickon", getCelebrationAtKickOn);
highLights.put("/celebration-at-kickon", verifyAdmin, updateCelebrationAtKickOn);

module.exports = highLights;
