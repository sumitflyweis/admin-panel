const express = require("express");

const router = express.Router();
const manageCategoryController = require("../../controllers/adminl-panel/manageCategory.controller");
const { isAuthenticated } = require("../../controllers/auth.controller");
router.post("/", isAuthenticated, manageCategoryController.addCategory);
router.put("/:id", isAuthenticated, manageCategoryController.addSubCategory);
 router.get("/", isAuthenticated, manageCategoryController.getSubCategory);
 router.delete("/:id", isAuthenticated, manageCategoryController.deleteCategory);
 //router.put("/:id", isAuthenticated, manageCategoryController.updateServices);

module.exports = router;
