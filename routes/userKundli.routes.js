const express = require("express");

const router = express.Router();
const { isAuthenticated } = require('../controllers/auth.controller')
const userkundliController =require('../controllers/userkundliController')
router.post("/add-user-kundli", isAuthenticated,  userkundliController.addUserKundli);
router.put("/update-user-kundli/:id",isAuthenticated, userkundliController.updateKundli);
router.get("/get-user-kundli", userkundliController.getDetails );


module.exports = router;