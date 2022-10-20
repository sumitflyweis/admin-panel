const express = require("express");
const { isAuthenticated } = require("../controllers/auth.controller");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/", isAuthenticated, chatController.createChat);
router.get("/:userId", isAuthenticated, chatController.userChats);
router.get(
  "/find/:firstId/:secondId",
  isAuthenticated,
  chatController.findChat
);

module.exports = router;
