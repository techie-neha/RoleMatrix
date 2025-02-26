const express = require('express');
const app = express();
require("dotenv").config();
const authRoutes = require('./routes/authRoutes')
const  userRoutes = require('./routes/userRoute')
const {createAdmin} = require('./controllers/auth')
const cors = require('cors');

    const corsOptions = {
        origin: "http://localhost:5173",
        credentials: true,
    }

 const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;

// Db Connection
const db = require("./config/db");
db.connect()
createAdmin();
// Routes
app.use("/api/v0/auth", authRoutes);
app.use("/api/v0",userRoutes)



app.get("/api", (req, res) => {
    res.json({ key: ["Value1", "Value2"] })

})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} `);
})