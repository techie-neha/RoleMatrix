const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { createTeam,deleteTeam } = require("../controllers/teamController");


router.post("/createteam", auth, isAdmin, createTeam);
router.delete("/deleteTeam/:teamId",auth,isAdmin,deleteTeam)

module.exports = router;