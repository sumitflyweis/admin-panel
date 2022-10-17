const express = require("express");
const router = express.Router();
const inventoryController = require("../../controllers/adminl-panel/inventory.controller");
router.post("/", inventoryController.addinventory);
router.get("/:id", inventoryController.getInventoryById);

module.exports = router;
