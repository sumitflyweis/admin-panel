
const express = require("express");
const cors = require("cors");
// var multer = require('multer');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const upload = require("./routes/bannerRoutes")
dotenv.config({ path: ".env" });
// require("dotenv").config();
// const cors = require('cors');
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cors());
//var upload = multer({ storage: storage });
//
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
//check
app.get("/url", (req, res, next) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.use("/", require("./routes/router"));
const Main = async () => {
  try {
    await mongoose.connect(DB_URI);

    app.listen(PORT, async () => {
      console.log(`server started ON ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

Main();
