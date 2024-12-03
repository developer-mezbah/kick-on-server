const express = require("express");
const {
  getAllAboutUsStore,
  createAboutUsStore,
  deleteAboutUsStore,
  updateAboutUsStore,
  getAboutUsStore,
} = require("../controllers/about.us.store.controller");
const verifyAdmin = require("../middlewares/admin.middleware");
const aboutUsStore = express.Router();

aboutUsStore.get("/", getAllAboutUsStore);
aboutUsStore.post("/", verifyAdmin, createAboutUsStore);
aboutUsStore.delete("/", verifyAdmin, deleteAboutUsStore);

aboutUsStore.put("/", verifyAdmin, updateAboutUsStore);

aboutUsStore.get("/:id", getAboutUsStore);
module.exports = aboutUsStore;
