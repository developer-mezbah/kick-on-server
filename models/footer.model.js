const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    titleColunOne: {
      type: String,
    },
    titleColunTwo: {
      type: String,
    },
    columnOne: {
      type: [Object],
    },
    columnTwo: {
      type: [Object],
    },
    socialLinks: {
      type: Object,
    },
  },
  { timestamps: true }
);

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});
const Footer = mongoose.model("footer", footerSchema);
const Subscriber = mongoose.model("subscriber", subscribeSchema);
module.exports = {
  Footer,
  Subscriber
};
