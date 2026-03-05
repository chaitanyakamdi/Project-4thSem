// const express = require("express");
// const router = express.Router();
// const Item = require("../models/item");




// router.get("/", async (req, res) => {
//    const items = await Item.find().sort({ date: -1 });
//    res.json(items);
// });

// router.post("/", async (req, res) => {
//    const item = new Item(req.body);
//    await item.save();
//    res.json({ message: "Item Saved" });
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const Item = require("../models/item");

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
      time: req.body.time,

      personalinfo: {
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