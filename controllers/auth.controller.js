const User = require("../models/User");
const accountSid = "ACb21a2250e0bae3a0e1c15eddd3c370ed";
const authToken = "2a04b800999f898232197a811f68f90b";
const verifySid = "VA84bc752a91abcf7df9f31c76832bafff";
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const otp = require("../services/OTP");
const blog = require("../models/blog");
const dotenv = require("dotenv");
const wallet = require("../models/wallet");

dotenv.config({ path: "../.env" });
// const { status } = require('express/lib/response');

const generateJwtToken = (id) => {
  return jwt.sign({ id }, JWTkey, {
    expiresIn: "7d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = generateJwtToken(user._id.toString());
  // console.log("token", token);
  // console.log(process.env.JWT_COOKIE_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // console.log("After cookie");

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.sendOTP = async (req, res) => {
  await client.verify.v2
    .services(verifySid)
    .verifications.create({
      to: `+91${req.body.mobile_Number}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).send(data);
      console.log("sent OTP!");
    })
    .catch((err) => {
      console.log(err);
      return next(new AppError(`Couldn't send OTP`, 401));
    });
};

exports.verifyOTP = async (req, res) => {
  await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({
      to: `+91${req.body.mobile_Number}`,
      code: req.body.otp,
    })
    .then((data) => {
      res.status(200).send({
        status: data.status,
      });
      console.log("verified! 👍");
    })
    .catch((err) => {
      res.status(401).json({
        message: "Wrong OTP entered!",
      });
      console.log("wrong OTP !!");
    });
};

exports.verifyOTPSignedIn = async (req, res, next) => {
  const user = await User.findOne({ mobile_Number: req.body.mobile_Number });
  console.log(user);
  await client.verify
    .services(verifySid)
    .verificationChecks.create({
      to: `+91${req.body.mobile_Number}`,
      code: req.body.otp,
    })
    .then((data) => {
      createSendToken(user, 201, res);
      console.log("verified! 👍", data);
    })
    .catch((err) => {
      console.log("wrong OTP !!", err);
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting Token & check if its there!
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, please login to get access!", 401)
    );
  }

  // 2) Verification of Token
  const decoded = await promisify(jwt.verify)(token, JWTkey);

  // 3) Check if user still exists.
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no  longer Exists!", 401)
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isAuthenticated = async (req, res, next) => {
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

exports.userMiddleware = async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "Please login to get access",
    });
  } else {
    next();
  }
};

// Verify

module.exports.signUpUser = async (req, res) => {
  const user = await User.create(req.body);
  await wallet.create({ user: user._id });
  createSendToken(user, 201, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

//patch api
module.exports.updateUserProfile = async (req, res) => {
  const {
    first_Name,
    last_Name,
    gender,
    date_of_Birth,
    place_of_Birth,
    profile_Images,
  } = req.body;
  if (
    !(
      first_Name &&
      last_Name &&
      gender &&
      date_of_Birth &&
      place_of_Birth &&
      profile_Images
    )
  )
    res.status(400).json({ message: "Required fields" });
  // let u = await User.find({_id:req.user})
  // res.send(u)
  const UpdateUser = await User.findByIdAndUpdate(req.user, {
    first_Name,
    last_Name,
    gender,
    date_of_Birth,
    place_of_Birth,
    profile_Images,
  });

  if (!UpdateUser)
    res.status(400).json({ message: "Enter the correct Id", status: false });

  res.status(200).json({
    message: "Update is successfull",
    status: true,
    UpdateUser,
  });
};

// /get api

module.exports.GetUserProfiles = async (req, res, next) => {
  // console.log(req.user);
  try {
    const UpdateUser = await User.findById(req.user);
    return res.status(200).json({
      success: true,
      msg: "UpdateUser",
      UpdateUser: UpdateUser,
    });
  } catch (error) {
    next(error);
  }
};

//post for blog user

module.exports.postuserBlogs = async (req, res) => {
  let photo = req.body;
  photo["blog_Images"] = [req.file.originalname];
  let { Date, User_Name, sub_Title, Intro, blog_Images } = photo;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await blog.create({
        User_Name,
        Date,
        sub_Title,
        Intro,
        blog_Images,
      });

      if (!getResponce) {
        res
          .status(400)
          .json({ message: "User Blogs  is not created", status: false });
      } else {
        res.status(200).json({
          message: "User Blog is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//update blog for user

module.exports.UpdateBlogs = async (req, res) => {
  let photo = req.body;
  photo["blog_Images"] = [req.file.originalname];
  // console.log(photo);
  let { Date, User_Name, sub_Title, Intro, blog_Images } = photo;

  if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
    res.status(400).json({ message: "All fields are required", status: false });
  } else {
    const updatedBlogs = await blog.findByIdAndUpdate(
      { _id: req.params.id },
      {
        User_Name,
        Date,
        sub_Title,
        Intro,
        blog_Images,
      }
    );
    if (!updatedBlogs) {
      res.send("Unable to update Blogs");
    }
    res.send(updatedBlogs);
  }
};

//
