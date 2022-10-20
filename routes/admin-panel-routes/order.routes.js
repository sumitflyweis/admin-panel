const express = require("express");
const router = express.Router();
const ordercontroller = require("../../controllers/adminl-panel/order.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");
router.post("/",isAuthenticated, ordercontroller.addOrder);
router.get("/",isAuthenticated, ordercontroller.getOrder);
router.get("/:id",isAuthenticated, ordercontroller.getOrderById);
module.exports = router;
