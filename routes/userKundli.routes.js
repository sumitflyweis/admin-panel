const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../controllers/auth.controller");
const userkundliController = require("../controllers/userkundliController");
var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname} ${Date.now() + file.originalname}.${ext}`);
  },
});

const fileFilter = function fileFilter(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter,
});

router.post(
  "/add-user-kundli",
  isAuthenticated,
  upload.single("image"),
  userkundliController.addUserKundli
);
router.put(
  "/update-user-kundli/:id",
  isAuthenticated,
  upload.single("image"),
  userkundliController.updateKundli
);
router.get("/get-user-kundli", userkundliController.getDetails);
router.delete("/:id", userkundliController.deleteKundli);

module.exports = router;
