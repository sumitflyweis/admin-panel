const express = require("express");
const router = express.Router();

const { isAuthenticated } = require('../controllers/auth.controller')
const user = require('../controllers/userDetailsController')

const app = require("express");
const path = require("path");
var multer = require("multer");
const { is } = require("express/lib/request");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });
router.post('/user-profiles', upload.single("myField"), isAuthenticated, user.postuserProfiles)
router.get('/view-user-details/:id', isAuthenticated,user.ViewDataProfiles)
router.patch('/edit-user-profiles/:id', upload.single("myField"), isAuthenticated, user.updateUserProfile)
router.get('/search-language', isAuthenticated, user.SearchUserNameLangSkills)
router.get('/search-any-user-name', isAuthenticated, user.SearchUserName)
router.get('/search-by-languages', isAuthenticated, user.SearchAnyLanguagsrName)
router.delete('/removed/:user_Name', isAuthenticated, user.deleteUserName)
router.delete('/removed-language/:language', isAuthenticated, user.deleteLanguages)
// router.get('/search-only-user-name',upload.single("myField"),isAuthenticated,user.SearchOnlyUserName)












module.exports = router;
