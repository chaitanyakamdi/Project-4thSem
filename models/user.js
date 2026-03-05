// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   fullName: String,
//   collegeId: String,
//   department: String,
//   email: { type: String, unique: true },
//   mobile: String,
//   address: String,
//   password: String,
//   confirmPassword:String,
//   profilePhoto: String,
//   collegeIdPhoto: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  collegeId: String,
  department: String,
  email: { type: String, unique: true, required: true },
  mobile: String,
  address: String,
  password: { type: String, required: true },
  profilePhoto: String,
  collegeIdPhoto: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

