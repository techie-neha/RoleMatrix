const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unqiue: true }, //PK
    password: { type: String, required: true },
    role: { type: String, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],

})


module.exports = mongoose.model("User", userSchema);