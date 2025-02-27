const express = require("express");
const router = express.Router();
const {auth,isAdmin} = require("../middleware/auth");
const {getAllUsers,deleteUser} = require("../controllers/userController");


router.get("/allusers",auth,isAdmin,getAllUsers)
router.delete("/deleteuser/:userId",auth,isAdmin,deleteUser)

module.exports = router