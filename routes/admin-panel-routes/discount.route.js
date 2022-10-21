const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/adminl-panel/discount.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");

router.post("/", isAuthenticated, discountController.addDiscount);
router.delete("/:id", isAuthenticated, discountController.deleteDiscount);
router.get("/", isAuthenticated, discountController.getDiscountDetails);
module.exports = router;
