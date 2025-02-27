const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, //PK
    email: { type: String },
    designation: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);