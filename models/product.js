const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    details: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    upcoming: {
      type: Boolean,
      default: false,
      required: false
    },
    gender: {
      type: String,
      // enum: ["male", "female"],
      required: false,
    },
    primaryImage: {
      type: Object,
      required: true,
    },
    categoryId: {
      type: String,
      required: false,
    },
    categoryName: {
      type: String,
      required: false,
    },
    productTypeName: {
      type: String,
      required: false,
    },
    productTypeId: {
      type: String,
      required: false,
    },
    brandName: {
      type: String,
      required: false,
    },
    brandNameId: {
      type: String,
      required: false,
    },
    size: {
      type: Object,
      required: false,
    },
    apparelSize: {
      type: Object,
      required: false,
    },
    colors: {
      type: [],
      required: false,
    },
    otherPhotos: {
      type: [Object],
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);



// product category
const ProductCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  primaryImage: {
    type: Object,
    required: true,
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

// product type name
const ProductTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});
const ProductTypeName = mongoose.model("ProductType", ProductTypeSchema);


// Brand Name
const ProductBrandNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});
const BrandName = mongoose.model("BrandName", ProductBrandNameSchema);





module.exports = {
  Product,
  ProductCategory,
  ProductTypeName,
  BrandName
};
