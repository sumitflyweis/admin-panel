const express = require("express");

const router = express.Router();
const serviceController = require("../../controllers/adminl-panel/services.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");
router.post("/", isAuthenticated, serviceController.addServices);
router.get("/", isAuthenticated, serviceController.getServices);
router.get("/:id", isAuthenticated, serviceController.getServicesById);
router.delete("/:id", isAuthenticated, serviceController.deleteServices);
router.put("/:id", isAuthenticated, serviceController.updateServices);

module.exports = router;
