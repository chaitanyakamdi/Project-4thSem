const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    title: String,
    description: String,
    category: String,

    status: {  
        type: String,
        enum: ["lost", "found"]
    },

    // img shcema 
    
    image: [String],

    location: String,
    date: Date,
    time: String,

    personalInfo: {
        name: String,
        number: String,
        collegeId: String,
        email: String,
        department: String,
        role: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);