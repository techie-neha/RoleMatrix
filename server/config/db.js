const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    const dbURI = process.env.MONGODB_URL;


    mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        .then(() => console.log("DB Connected Successfully"))
        .catch((error) => {
            console.log("DB Connection Failed");
            console.error("Error:", error.message);
            process.exit(1);
        });
};