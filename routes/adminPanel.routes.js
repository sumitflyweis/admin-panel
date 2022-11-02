const express = require("express");

const router = express.Router();
const adminPanelController = require("../controllers/AdminPanelController");
const admin = require("../controllers/admin");
const kundli = require("../controllers/userkundliController");
const horoscope = require("../controllers/horoscopr.controller");

router.post("/register", adminPanelController.registerUser);
router.post("/login", adminPanelController.authUser);
router.get(
  "/admin",
  adminPanelController.isAuthenticated2,
  adminPanelController.getAllUsersDetails
);
router.post(
  "/admin-signup",
  adminPanelController.isAuthenticated2,
  admin.signUpUser
);
router.delete(
  "/admin-delete/:id",
  adminPanelController.isAuthenticated2,
  admin.deleteUser
);
router.put(
  "/admin-update/:id",
  adminPanelController.isAuthenticated2,
  admin.updateUser
);

router.post(
  "/kundli",
  adminPanelController.isAuthenticated2,
  kundli.addUserKundli
);
router.put(
  "/kundli/:id",
  adminPanelController.isAuthenticated2,
  kundli.updateKundli
);
router.get("/kundli", adminPanelController.isAuthenticated2, kundli.getDetails);
router.delete(
  "/kundli/:id",
  adminPanelController.isAuthenticated2,
  kundli.deleteKundli
);

router.post(
  "/horoscope",
  adminPanelController.isAuthenticated2,
  horoscope.addhoroscope
);
router.get(
  "/horoscope",
  adminPanelController.isAuthenticated2,
  horoscope.getDetails
);
router.put(
  "/horoscope/:id",
  adminPanelController.isAuthenticated2,
  horoscope.updatehoroscope
);
router.delete(
  "/horoscope/:id",
  adminPanelController.isAuthenticated2,
  horoscope.deleteHoroscope
);
module.exports = router;
