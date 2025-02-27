const express = require("express");
const router = express.Router();
const { auth, isUserOrOther } = require("../middleware/auth");
const { createContact,deleteContact ,updateContact, getAllContacts} = require("../controllers/contactController");


router.post("/createContact", auth, isUserOrOther, createContact);

router.delete("/deleteContact/:contactId",auth,isUserOrOther,deleteContact)


router.put("/updateContact/:contactId", auth, isUserOrOther, updateContact);


router.get("/getAllContacts",auth, isUserOrOther,getAllContacts)
module.exports = router;
