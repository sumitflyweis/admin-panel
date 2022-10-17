const express = require("express");
const { isAuthenticated } = require("../controllers/auth.controller");
const specificontroller = require("../controllers/specific.controller")

const router = express.Router();
router.post("/" ,isAuthenticated,specificontroller.addSpecification);
router.get("/" ,isAuthenticated,specificontroller.getDetails);
module.exports = router;