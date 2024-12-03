const express = require("express");
const {
  updateOrCreate,
  getSingleitem,
  AllSubscribers,
  CreateSubscriber,
  deleteSubscriber,
} = require("../controllers/footer.controller");
const verifyAdmin = require("../middlewares/admin.middleware");
const footerRouter = express.Router();

footerRouter.post("/", verifyAdmin, updateOrCreate);
footerRouter.get("/", getSingleitem);
footerRouter.get("/subscriber", AllSubscribers);
footerRouter.post("/subscriber", CreateSubscriber);
footerRouter.delete("/subscriber", verifyAdmin, deleteSubscriber);
module.exports = footerRouter;
