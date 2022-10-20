const express = require("express");

const router = express.Router();
const { isAuthenticated } = require('../controllers/auth.controller')
const horoscopeController = require("../controllers/horoscopr.controller")
router.post("/",isAuthenticated,horoscopeController.addhoroscope)
router.put("/:id",isAuthenticated,horoscopeController.updatehoroscope)
router.get("/",isAuthenticated,horoscopeController.getDetails)

module.exports = router;