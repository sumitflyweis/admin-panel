const express = require("express");
const router = express.Router();
const ordercontroller = require("../../controllers/adminl-panel/order.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");
router.post("/", ordercontroller.addOrder);
router.get("/", isAuthenticated, ordercontroller.getOrder);
router.get("/:id", isAuthenticated, ordercontroller.getOrderById);
router.delete("/:id", isAuthenticated, ordercontroller.deleteOrder);
module.exports = router;
