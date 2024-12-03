const express = require("express");
const {
  getNavItems,
  createNavItem,
  deleteNavItem,
  updateNavItems,
  getLogo,
  updateLogo,
} = require("../controllers/navbar.controller");
const verifyAdmin = require("../middlewares/admin.middleware");
const navbarRouter = express.Router();

navbarRouter.get("/", getNavItems);
navbarRouter.post("/", verifyAdmin, createNavItem);
navbarRouter.delete("/", verifyAdmin, deleteNavItem);
navbarRouter.put("/", verifyAdmin, updateNavItems);

navbarRouter.get("/logo", getLogo);
navbarRouter.put("/logo",verifyAdmin, updateLogo);

module.exports = navbarRouter;
