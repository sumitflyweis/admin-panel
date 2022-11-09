"use strict";
const fs = require("fs");
const app = require("express");
const path = require("path");
// const upload = require("../controllers/middleware/uploads");
const router = app.Router();

// router.post("/upload", upload.single("file"), async (req, res) => {
//   if (req.file === undefined) return res.send("you must select a file.");
//   const imgUrl = `http://localhost:2097/file/${req.file.filename}`;
//   return res.send(imgUrl);
// });

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "banner_" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname} ${Date.now() + file.originalname}.${ext}`);
//   },
// });

// const fileFilter = function fileFilter(req, file, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;

//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: fileFilter,
// });

// router.post("/uploadphoto", upload.single("myImage"), (req, res) => {
//   if (req.file === undefined) return res.send("you must select a file.");
//   var img = fs.readFileSync(req.file.path);
//   var encode_img = img.toString("base64");
//   var final_img = {
//     contentType: req.file.mimetype,
//     image: new Buffer(encode_img, "base64"),
//   };
//   Banner.create(final_img, function (err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result.img.Buffer);
//       console.log("Saved To database");
//       // res.contentType(final_img.contentType);
//       res.send(final_img.image);
//     }
//   });
// });

const {
  addBanner,
  getBanner,
  editBanner,
  deleteBanner,
} = require("../controllers/BannerController");
const { isAuthenticated } = require("../controllers/auth.controller");
const Banner = require("../models/Banner");

router.post(
  "/addBanner",
  upload.array("myField", 3),
  isAuthenticated,
  addBanner
);
router.get("/getBanner", isAuthenticated, getBanner);
router.post(
  "/editBanner/:id",
  upload.single("myField"),
  isAuthenticated,
  editBanner
);
router.delete("/deleteBanner/:id", isAuthenticated, deleteBanner);

module.exports = router;
