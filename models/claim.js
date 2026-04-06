const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({

itemId:String,

claimerName:String,

btId:String,

department:String,

claimerContact:String,

claimerEmail:String,

collegeIdCard:String,

itemProofImages:[String],

itemProofDescription:String,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Claim",claimSchema);