const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

const { isAuthenticated } = require("../controllers/auth.controller");

const app = require("express");
const path = require("path");
var multer = require("multer");
const { route } = require("./auth.route");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/login-admin", admin.login);
router.post("/signup", admin.signUpUser);
router.post("/resetpassword", admin.resetPassword);
router.post("/verifyotp", admin.verifyOTP);
router.get("/getdetails", admin.getAllUsersDetails);
router.put("/changepassword/:id/:token", admin.changePassword);

// router.get("/search-user", isAuthenticated, admin.allUsers);
// router.post(
//   "/user-blog",
//   upload.single("myField"),
//   isAuthenticated,
//   admin.postuserBlogs
// );
// router.get("/get-blogs/:id", isAuthenticated, admin.ViewDataBlogs);
// router.patch(
//   "/edit-user-blog/:id",
//   upload.single("myField"),
//   isAuthenticated,
//   admin.UpdateBlogs
// );
// router.delete("/remove-blog/:id", isAuthenticated, admin.RemovedBlogs);
// router.post("/add-feedback", isAuthenticated, admin.UserFeedback);
// router.get("/view-feedback", isAuthenticated, admin.ViewAllFeedback);

router.post("/notification", isAuthenticated, admin.addNotification);
router.get("/notification", isAuthenticated, admin.getNotification);

module.exports = router;
