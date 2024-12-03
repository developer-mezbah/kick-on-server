require("dotenv").config();
const express = require("express");
const { clerkMiddleware } = require("@clerk/express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const productRouter = require("./routes/productRoutes.js");
const categoryRouter = require("./routes/catgoryRouter.js");
const producTypeRouter = require("./routes/producTypeRouter.js");
const producBrandRouter = require("./routes/producBrandRouter.js");
const { productResource } = require("./controllers/product.js");
const topBanner = require("./routes/topBanner.js");
const productSlider = require("./routes/productSlider.js");
const aboutUsStore = require("./routes/about.us.store.router.js");
const {
  getAllHomeData,
} = require("./controllers/home.page.data.controller.js");
const footerRouter = require("./routes/footer.router.js");
const highLights = require("./routes/high.lights.router.js");
const navbarRouter = require("./routes/navbar.router.js");
const verifyAdmin = require("./middlewares/admin.middleware.js");

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

//db connectDB
connectDB();

// api endpoints
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/product-type", producTypeRouter);
app.use("/product-brand", producBrandRouter);
app.use("/top-banner", topBanner);
app.use("/product-slider", productSlider);
app.use("/about-us-store", aboutUsStore);
app.use("/footer", footerRouter);
app.use("/highlights", highLights);
app.use("/navbar", navbarRouter);

app.get("/product-resource", productResource);
app.get("/home-data", getAllHomeData);

app.get("/", verifyAdmin, (req, res) => {
  res.status(200).json({ result: "API WORKING!" });
});


app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
