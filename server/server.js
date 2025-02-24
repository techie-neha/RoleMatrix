const express = require('express');
const app = express();

const PORT = 3000;

app.get("/api", (req, res) => {
    res.json("this is server")
})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT} `);
})