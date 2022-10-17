const express = require("express");
const router = express.Router();
const productController = require("../../controllers/adminl-panel/product.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");

router.post("/", isAuthenticated, productController.addProduct);
router.get("/", isAuthenticated, productController.getProduct);
router.get("/:id", isAuthenticated, productController.getProductById);
router.post("/:id", isAuthenticated, productController.updateProduct);
router.delete("/:id", isAuthenticated, productController.deleteProduct);
module.exports = router;
