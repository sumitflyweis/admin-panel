const express = require("express");
const router = express.Router();
const ordercontroller = require("../../controllers/adminl-panel/order.controller");
router.post("/", ordercontroller.addOrder);
router.get("/", ordercontroller.getOrder);
router.get("/:id", ordercontroller.getOrderById);
module.exports = router;
