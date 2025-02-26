const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middleware/auth");
const {getAllUsers} = require("../controllers/userController");


router.get("/allusers",auth,isAdmin,getAllUsers)


module.exports = router