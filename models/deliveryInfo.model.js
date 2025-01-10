const mongoose = require("mongoose");

const deleveryInfoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    area: {
      type: String,
    },
    locationReference: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    deleveryOption: {
      type: String,
    },
  },
  { timestamps: true }
);

const DeleverInfo = mongoose.model("Delevery-Information", deleveryInfoSchema);
module.exports = {
  DeleverInfo,
};
