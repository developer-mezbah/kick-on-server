const express = require("express");
const {
  getAllTopBanners,
  createTopBanner,
  deleteTopBanner,
  updateTopBanner,
  getTopBanner,
} = require("../controllers/topBanner");
const verifyAdmin = require("../middlewares/admin.middleware");
const topBanner = express.Router();

topBanner.get("/", getAllTopBanners);
topBanner.post("/", verifyAdmin, createTopBanner);
topBanner.delete("/", verifyAdmin, deleteTopBanner);

topBanner.put("/", verifyAdmin, updateTopBanner);

topBanner.get("/:id", getTopBanner);
module.exports = topBanner;
