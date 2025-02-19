const express = require("express");
const verifyAdmin = require("../middlewares/admin.middleware");
const Image = require("../models/Image");
const media = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Config for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });

media.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

media.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const imageDetails = req.files.map((file) => ({
      file_name: file.originalname,
      file_size: file.size,
      img_url: file.path, // Cloudinary URL
      public_id: file.filename, // Cloudinary public ID
    }));

    const savedImages = await Image.insertMany(imageDetails);

    if (savedImages) {
      res.json({
        message: "Images uploaded successfully",
        images: savedImages,
        status: true,
      });
    } else {
      res.json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
media.delete("/delete", async (req, res) => {
  try {
    const { public_ids } = req.body; // Array of public IDs

    if (!public_ids || public_ids.length === 0) {
      return res
        .status(400)
        .json({ message: "No images specified for deletion" });
    }

    // Delete images from Cloudinary
    await cloudinary.api.delete_resources(public_ids);

    // Delete images from MongoDB
    await Image.deleteMany({ public_id: { $in: public_ids } });

    res.json({ message: "Images deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = media;
