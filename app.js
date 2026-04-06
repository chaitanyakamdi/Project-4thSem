



const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
let port = 3000;

const connectDB = require("./init");

const User = require("./models/user");
const Item = require("./models/item");   

const itemRoutes = require("./routes/item.js");
const userRoutes = require("./routes/user");
const claimRoutes = require("./routes/claim");

connectDB();

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend")));
app.use("/uploads", express.static(path.join(__dirname, "frontend/uploads")));
app.set("view engine", "ejs");

/* ================= SESSION ================= */

app.use(
  session({
    secret: "lostfoundsecret",
    resave: false,
    saveUninitialized: false
  })
);

/* ================= ROUTES ================= */
app.use("/items", claimRoutes);
app.use("/items", itemRoutes);   
app.use("/", userRoutes);

/* ================= HOME ================= */

app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login.html");
  }

  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/home", async (req, res) => {
  const items = await Item.find();
  res.render("index", { items });
});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong password");
    }

    req.session.user = {
      id: user._id,
      name: user.fullName,
      email: user.email,
      collegeId: user.collegeId,
      profilePhoto: user.profilePhoto
    };

    res.redirect("/home");

  } catch (err) {

    console.log(err);
    res.status(500).send("Login error");

  }
});

/* ================= LOGOUT ================= */

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
});

/* ================= API USER ================= */

app.get("/api/user", (req, res) => {
  if (!req.session.user) return res.json(null);
  res.json(req.session.user);
});

/* ================= REPORT PAGES ================= */

app.get("/report/lost", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "report-lost.html"));
});

app.get("/report/found", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "report-found.html"));
});

/* ================= LOGIN CHECK ================= */

app.get("/check-login", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

/* ================= API ITEMS ================= */

app.get('/api/items', async (req, res) => {
  try {

    const items = await Item.find({});
    res.json(items);

  } catch (err) {

    res.status(500).json({ error: "Data ghenyat problem ala" });

  }
});

/* ================= ITEMS ================= */

app.get("/items", async (req, res) => {
  try {

    const items = await Item.find().sort({ date: -1 });
    res.json(items);

  } catch (err) {

    res.status(500).json({ message: "Error fetching items" });

  }
});

/* ================= SERVER ================= */

app.listen(port, () => {
  console.log("Server running on port", port);
});



