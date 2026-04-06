

const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const Claim = require("../models/claim");

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

/* EMAIL SETUP */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lostfoundjdcoem@gmail.com",   // <-- tuza gmail
    pass: "usps yfwx yhwn mcfo"       // <-- gmail app password
  }
});

/* CLAIM ROUTE */

router.post(
  "/claim",
  upload.fields([
    { name: "collegeIdCard", maxCount: 1 },
    { name: "itemProofImages", maxCount: 5 }
  ]),
  async (req, res) => {
    try {

      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      const {
        itemId,
        claimerName,
        btId,
        department,
        claimerContact,
        claimerEmail,
        itemProofDescription
      } = req.body;

      const collegeIdCard =
        req.files?.collegeIdCard?.[0]?.filename || "";

      const itemProofImages =
        req.files?.itemProofImages?.map(file => file.filename) || [];

      /* SAVE CLAIM IN DATABASE */

      const newClaim = new Claim({
        itemId,
        claimerName,
        btId,
        department,
        claimerContact,
        claimerEmail,
        collegeIdCard,
        itemProofImages,
        itemProofDescription
      });

      await newClaim.save();

      /* SEND EMAIL */

      const mailOptions = {
        from: "YOUR_EMAIL@gmail.com",
        to: "ADMIN_EMAIL@gmail.com",   // admin email
        subject: "New Lost & Found Claim Request",
        html: `
          <h2>New Item Claim Submitted</h2>
          <p><b>Item ID:</b> ${itemId}</p>
          <p><b>Name:</b> ${claimerName}</p>
          <p><b>BT ID:</b> ${btId}</p>
          <p><b>Department:</b> ${department}</p>
          <p><b>Contact:</b> ${claimerContact}</p>
          <p><b>Email:</b> ${claimerEmail}</p>
          <p><b>Proof Description:</b> ${itemProofDescription}</p>
        `
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: "Claim submitted successfully & Email sent!" });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error processing claim" });
    }
  }
);

module.exports = router;