const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    file_name: String,
    file_size: Number,
    img_url: String,
    public_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
