const User = require("../models/User");
<<<<<<< HEAD
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
=======
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const jwt = require("jsonwebtoken");
const JWTkey = "rubi";
const otp = require("../services/OTP");
const blog = require("../models/blog");
const Wallet = require("../models/wallet");
const Notifications = require("../models/userSetting");
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
// const { status } = require('express/lib/response');

const generateJwtToken = (id) => {
  return jwt.sign({ id }, JWTkey, {
    expiresIn: "7d",
  });
};

<<<<<<< HEAD
const createSendToken = (user, statusCode, res) => {
  const token = generateJwtToken(user._id);
=======
const sendSMS = async (to, otp) => {
  const from = "+19287568632";
  await client.messages
    .create({
      body: otp,
      from: from,
      to: to,
    })
    .then((message) => {
      console.log(message.sid);
      return message;
    });
};
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  console.log("After cookie");
  user.password = undefined;

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
<<<<<<< HEAD
    console.log("entered authorization");
=======
    console.log("entered authorization!!!");
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
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
<<<<<<< HEAD
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

  createSendToken(user, 201, res);
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

=======
  User.findById(req.user).exec((err, user) => {
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

// Verify
module.exports.verify_Mobile_Number = async (req, res) => {
  const { mobile_Number, otp } = req.body;
  const user = await User.findOne({ mobile_Number });
  if (!user) res.send("User not found");
  if (user && user.otp !== otp)
    res.status(400).json({ message: "Invalid otp" });
  const token = generateJwtToken(user._id);
  res.status(200).json({ token });
};

module.exports.signUpUser = async (req, res) => {
  const { mobile_Number } = req.body;
  let Existing = await User.findOne({ mobile_Number });
  const otpGenerated = Math.floor(100000 + Math.random() * 900000);
  if (Existing) {
    Existing.otp = otpGenerated;
    const existinguser = await Existing.save();
    sendSMS(`+91${mobile_Number}`, otpGenerated);
    if (existinguser) res.status(200).json(existinguser);
    res.status(400).json({ message: "no otp" });
  } else {
    const ReferCode = otp.generateOTP();
    const newUser = await User.create({
      mobile_Number,
      otp: otpGenerated,
      ReferCode,
    });
    // const wallet = await Wallet.create({})
    // const notification = await Notifications.create({})

    sendSMS(`+91${mobile_Number}`, otpGenerated);
    if (!newUser) res.status(400).json({ message: "Unable to sign you up" });
    res.status(200).json(newUser);
  }
};

>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
//patch api
module.exports.updateUserProfile = async (req, res) => {
  const {
    first_Name,
    last_Name,
    gender,
<<<<<<< HEAD
    date_of_Birth,
    place_of_Birth,
    profile_Images,
  } = req.body;
=======
    time_of_Birth,
    place_of_Birth,
    profile_Images,
  } = req.body;
  console.log("req.user", req.user);
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
  if (
    !(
      first_Name &&
      last_Name &&
      gender &&
<<<<<<< HEAD
      date_of_Birth &&
=======
      time_of_Birth &&
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
      place_of_Birth &&
      profile_Images
    )
  )
<<<<<<< HEAD
    res.status(400).json({ message: "Required fields" });
=======
    res.status(400).json({ message: "Reuired fields" });
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
  // let u = await User.find({_id:req.user})
  // res.send(u)
  const UpdateUser = await User.findByIdAndUpdate(req.user, {
    first_Name,
    last_Name,
    gender,
<<<<<<< HEAD
    date_of_Birth,
    place_of_Birth,
    profile_Images,
  });

  if (!UpdateUser)
    res.status(400).json({ message: "Enter the correct Id", status: false });

  res.status(200).json({
    message: "Update is successfull",
=======
    time_of_Birth,
    place_of_Birth,
    profile_Images,
  });
  if (!UpdateUser)
    res.status(400).json({ message: "Enter the correct Id", status: false });
  res.status(200).json({
    message: "Udpate is successfully",
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
    status: true,
    UpdateUser,
  });
};

// /get api

module.exports.GetUserProfiles = async (req, res, next) => {
<<<<<<< HEAD
  // console.log(req.user);
=======
  console.log(req.user);
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
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
          message: "User Bloges is created successfully",
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
<<<<<<< HEAD
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
=======
  let { Date, User_Name, sub_Title, Intro, blog_Images } = req.body;

  try {
    if (!(Date && User_Name && sub_Title && Intro && blog_Images)) {
      res.json({ message: "All fields are required", status: false });
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
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
      }
    );
    if (!updatedBlogs) {
      res.send("Unable to update Blogs");
    }
<<<<<<< HEAD
    res.send(updatedBlogs);
  }
};


=======
  } catch {}
};

//
>>>>>>> 4dc54ce16a8aa0a2273f2ae592d785a3b13e179d
