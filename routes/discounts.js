const express = require("express");
const { isAuthenticated } = require("../controllers/auth.controller");
const discountController = require("../controllers/discount.controller");

const router = express.Router();
router.post("/dis-count", isAuthenticated, discountController.discount);
router.get("/",isAuthenticated,discountController.getalldiscount)
router.put("/:id",isAuthenticated,discountController.updatediscount)
module.exports = router;
