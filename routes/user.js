
const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

/* ========= STORAGE ========= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "frontend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ========= REGISTER ========= */
router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "collegeIdPhoto", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        name,
        collegeId,
        department,
        email,
        mobile,
        address,
        password,
        confirmPassword
      } = req.body;

      if (password !== confirmPassword) {
        return res.send("Passwords do not match");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.send("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullName: name,
        collegeId,
        department,
        email,
        mobile,
        address,
        password: hashedPassword,
        profilePhoto: req.files?.profilePhoto?.[0]?.filename || "",
        collegeIdPhoto: req.files?.collegeIdPhoto?.[0]?.filename || ""
      });

      await newUser.save();

      /* session */
      req.session.user = {
        id: newUser._id,
        name: newUser.fullName,
        profilePhoto: newUser.profilePhoto
      };

      res.redirect("/home");
    } catch (err) {
      console.log(err);
      res.status(500).send("Register failed");
    }
  }
);

module.exports = router;


