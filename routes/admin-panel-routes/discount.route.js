const express = require("express");
const router = express.Router();
const discountController = require("../../controllers/adminl-panel/discount.controller");

router.post("/", discountController.addDiscount);
router.delete("/:id", discountController.deleteDiscount);
router.get("/",discountController.getDiscountDetails);
module.exports = router;
