const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../controllers/auth.controller')
const app = require("express");
const path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post('/signUp', isAuthenticated,authController.signUpUser);

router.post('/verify', isAuthenticated,authController.verify_Mobile_Number);
router.post('/update-profile', isAuthenticated, authController.updateUserProfile)
router.get('/view-user-profiles', isAuthenticated, authController.GetUserProfiles)
router.post('/user-blog', upload.single("myField"), isAuthenticated, authController.postuserBlogs)
router.patch('/edit-user-blog/:id', upload.single("myField"), isAuthenticated,authController.UpdateBlogs)


module.exports = router;