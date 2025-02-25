const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const userRoutes = require('./routes/authRoutes')
    // const corsOptions = {
    //     origin: [" http://localhost:5174/"]
    // }

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

// Db Connection
const db = require("./config/db");
db.connect()

// Routes
app.use("/api/v0/auth", userRoutes)



app.get("/api", (req, res) => {
    res.json({ key: ["Value1", "Value2"] })

})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} `);
})