// const express = require("express");
// const path = require("path");
// const app = express();
// const User = require("./models/user");
// const session = require("express-session");
// const bcrypt = require("bcryptjs");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "frontend/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// let port = 3000;

// const connectDB = require("./init");
// const itemRoutes = require("./routes/item.js");
// app.use("/",itemRoutes);

// connectDB();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname , "frontend")));
// app.use("/items", itemRoutes);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static("frontend"));



// app.use(
//   session({
//     secret: "lostfoundsecret",
//     resave: false,
//     saveUninitialized: false
//   })
// );



// app.get("/home", (req, res) => {
//   if (!req.session.user) {
//     return res.redirect("/login.html");
//   }

//   res.sendFile(path.join(__dirname, "frontend", "index.html"));
// });


// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/login.html");
//   });
// });



// app.get("/api/user", (req, res) => {
//   if (!req.session.user) return res.json(null);
//   res.json(req.session.user);
// });

// app.get("/report/lost", (req, res) => {
//   res.sendFile(__dirname + "/frontend/report-lost.html");
// });

// app.get("/report/found", (req, res) => {
//   res.sendFile(__dirname + "/frontend/report-found.html");
// });


// app.use('/uploads', express.static(path.join(__dirname, '/frontend/uploads')));

// app.post("/items", upload.single("image"), async (req, res) => {
//   try {
//     const data = req.body;
//     let imgArr = [];
//     if (req.file) {
//       imgArr.push(req.file.filename);
//     }

//     const newItem = new Item({
//       title: data.title,
//       description: data.description,
//       category: data.category,
//       status: data.status,
//       img: req.file ? [req.file.filename]:[],
//       location: data.location,
//       date: data.date,
//       time: data.time,
//       personalInfo: {
//         name: data.name,
//         number: data.number,
//         collegeId: data.collegeId,
//         email: data.email,
//         department: data.department,
//         role: data.role
//       }
//     });

//     await newItem.save();
//     res.redirect("/"); // home page
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error saving item");
//   }
// });



// app.use(session({
//   secret: "lostfoundsecret",
//   resave: false,
//   saveUninitialized: false
// }));

// const userRoutes = require("./routes/user");
// app.use("/", userRoutes);
// app.use(userRoutes);


// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.send("User not found");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.send("Wrong password");
//     }

//     // ✅ session set
//     req.session.user = {
//       id: user._id,
//       name: user.fullName,
//       email: user.email,
//       collegeId: user.collegeId,
//       profilePhoto: user.profilePhoto
//     };

//     // ✅ redirect to home
//     res.redirect("/home");

//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Login error");
//   }
// });

// app.post("/form", async (req, res) => {
//   try {
//     console.log(req.body); // 🔥 data check

//     const user = new User(req.body);
//     await user.save();
//     res.redirect("/home");
    
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error saving user");
//   }
// });

// app.get("/check-login", (req, res) => {
//   if (req.session.userId) {
//     res.json({ loggedIn: true });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });



// function isLoggedIn(req, res, next) {
//   if (req.session && req.session.userId) {
//     next();
//   } else {
//     res.redirect("/login.html");
//   }
// }

// // Then use it
// app.get("/report-lost.html", isLoggedIn, (req, res) => {
//   res.sendFile(__dirname + "/frontend/report-lost.html");
// });

// app.listen(port, (req,res)=> {
//    console.log("Server is on ");
// });


const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();
let port = 3000;

const connectDB = require("./init");
const User = require("./models/user");
const itemRoutes = require("./routes/item.js");
const userRoutes = require("./routes/user");

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

app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items); // Database madhla data JSON mhanun pathva
    } catch (err) {
        res.status(500).json({ error: "Data ghenyat problem ala" });
    }
});

// app.js madhe he add kar (Check kar ki 'Item' model import kela aahe)
const Item = require("./models/item"); // Tuzya model chi file path check kar

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 }); // Newest items pahile
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

/* ================= SERVER ================= */

app.listen(port, () => {
  console.log("Server running on port", port);
});