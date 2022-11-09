const AdminPanel = require("../models/AdminPanel.model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../services/crypto");
const Admin = require("../models/Admin");
const expressAsyncHandler = require("express-async-handler");
const JWTkey = "sumit";
const Notification = require("../models/notification");

module.exports.isAuthenticated2 = (req, res, next) => {
  if (req.headers.authorization) {
    console.log("entered authorization");
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWTkey);
    req.user = user.id;
    next();
  } else {
    return res.status(401).json({ message: "Authorization required" });
  }
};

exports.userMiddleware = (req, res, next) => {
  console.log(req.user);
  AdminPanel.findById(req.user).exec((err, user) => {
    if (user) {
      next();
    }
    if (err) {
      return res.status(400).json({
        message: "User access denied",
      });
    }
  });
};

module.exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, mobileNumber } = req.body;

  const userExists = await AdminPanel.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  if (!(name && email && password && mobileNumber)) {
    res.status(500).send("Fill the required filleds");
  }
  const user = await AdminPanel.create({
    name,
    email,
    password,
    pic,
    mobileNumber,
    isAdmin: true,
    role: "Admin",
  });

  if (user) {
    res.status(200).send({ msg: "registered successfully", user });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports.updateAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, pic, mobileNumber } = req.body;
  const id = req.params.id;

  const user = await AdminPanel.findByIdAndUpdate(id, {
    name,
    email,
    password,
    pic,
    mobileNumber,
  });

  if (user) {
    res.status(200).send({ msg: "update successfully", user });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
module.exports.authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await AdminPanel.findOne({ email });
    if (!user)
      res.status(400).json({
        message: "This Number is not registered",
      });

    if (user && (await compare(password, user.password))) {
      jwt.sign(
        { user_id: user._id },
        JWTkey,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) res.status(400).send("Invalid Credentials");
          res.send({ user, token });
        }
      );
    }
  } catch (error) {
    res.status(400).send({ msg: "ERROR", error });
    console.log(error);
  }
});

module.exports.getAllUsersDetails = async (req, res) => {
  try {
    const data = await Admin.find();
    res
      .status(200)
      .json({ message: "See All userDetails", data: data, status: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAdminDetail = expressAsyncHandler(async (req, res) => {
  try {
    const data = await AdminPanel.find();
    res
      .status(200)
      .json({ message: "See All userDetails", data: data, status: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports.addNotification = expressAsyncHandler(async (req, res) => {
  const { UserId, notification } = req.body;

  if (!notification) {
    res.send("fill the require filleds");
  }
  const ad = await AdminPanel.findOne({ UserId });
  console.log(ad);
  try {
    const data = new Notification({
      notification,
      userId: ad,
      role: "Admin",
    });

    const result = await data.save();
    res
      .status(200)
      .json({ message: "notification sent ", data: result, userId: ad });
  } catch (error) {
    res.status(400).send({ msg: "ERROR", error });
  }
});

module.exports.getNotification = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Notification.find();
    res
      .status(200)
      .json({ message: "See All notifications", data: data, status: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "ERROR", error });
  }
});
