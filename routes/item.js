

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/item");

// Get all items (for contact page)
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Claim item endpoint
router.post("/claim", async (req, res) => {
  try {
    // You can expand this logic to save claims in DB or notify admin
    const { itemId, claimerName, claimerContact } = req.body;
    if (!itemId || !claimerName || !claimerContact) {
      return res.status(400).json({ message: "All fields required" });
    }
    // For now, just respond success (customize as needed)
    res.json({ message: "Claim request submitted!" });
  } catch (err) {
    res.status(500).json({ message: "Error processing claim" });
  }
});

/* STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "frontend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* REPORT ITEM */
router.post("/", upload.single("image"), async (req, res) => {
  try {

    const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      image: req.file ? [req.file.filename] : [],
      location: req.body.location,
      date: req.body.date ? new Date(req.body.date) : undefined,
      time: req.body.time,
      personalInfo: {
        name: req.body.name,
        number: req.body.number,
        collegeId: req.body.collegeId,
        email: req.body.email,
        department: req.body.department,
        role: req.body.role
      }
    });

    await newItem.save();

    res.redirect("/home");

  } catch (err) {
    console.log(err);
    res.send("Error saving item");
  }
});

module.exports = router;