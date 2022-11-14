const express = require("express");
const router = express.Router();
const inventoryController = require("../../controllers/adminl-panel/inventory.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");
router.post("/", isAuthenticated, inventoryController.addinventory);
router.get("/:id", isAuthenticated, inventoryController.getInventoryById);
router.get("/", isAuthenticated, inventoryController.getInventory);
module.exports = router;
