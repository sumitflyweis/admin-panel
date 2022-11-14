const User = require("../models/User");
const Blog = require("../models/blog");
// onst UserDetail = require('../models/userDetails')
//post api--

module.exports.postuserProfiles = async (req, res) => {
  let photo = req.body;
  photo["User_Images"] = [req.file.originalname];
  let { Experience, Skills, AboutMe, User_Images, Languages } = photo;

  try {
    const getResponce = await User.findByIdAndUpdate(req.user, {
      Experience: Experience,
      Skills: JSON.parse(Skills),
      AboutMe: AboutMe,
      User_Images,
      Languages: JSON.parse(Languages),
    });

    if (!getResponce) {
      res.status(400).json({ message: "User  is not created", status: false });
    } else {
      res.status(200).json({
        message: "User is created successfully",
        data: getResponce,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//get api

module.exports.ViewDataProfiles = async (req, res) => {
  try {
    const getDetails = await User.findById(req.params.id);
    if (!getDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "User Details is Created successfully",
        data: getDetails,
        status: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//patch api

module.exports.updateUserProfile = async (req, res) => {
  const id = req.params.id;
  let photo = req.body;
  photo["User_Images"] = [req.file.originalname];
  const {
    User_ID,
    User_Name,
    Experince,
    Skills,
    AboutMe,
    User_Images,
    Languages,
  } = req.body;

  // console.log("req.user", req.user);
  if (
    !(
      User_ID &&
      User_Name &&
      Experince &&
      Skills &&
      AboutMe &&
      User_Images &&
      Languages
    )
  )
    res.status(400).json({ message: "Required fields" });
  const UpdateUser = await User.findByIdAndUpdate(id, {
    User_ID,
    User_Name,
    Experince,
    Skills: JSON.parse(Skills),
    AboutMe,
    User_Images,
    Languages: JSON.parse(Languages),
  });
  if (!UpdateUser) {
    res.status(400).json({ message: "Enter the correct Id", status: false });
  } else {
    res.status(200).json({
      message: "Udpate is successfully",
      status: true,
      UpdateUser,
    });
  }
};

//Search api
module.exports.SearchUserNameLangSkills = async (req, res) => {
  const search = req.query.search;
  try {
    const student = await User.find({
      $or: [
        { User_Name: { $regex: search, $options: "i" } },
        { Skills: { $regex: search, $options: "i" } },
        { Languages: { $regex: search, $options: "i" } },
      ],
    });
    if (student.length == 0) {
      res.json({ message: "Data is not Found", status: false });
    } else {
      res.json({
        message: " Data  is found Successfully",
        student: student,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// Serach api User Name
module.exports.SearchUserName = async (req, res) => {
  const search = req.query.search;
  try {
    const student = await User.find({
      User_Name: search,
    });
    if (student.length == 0) {
      res.json({ message: "This User was not Found", status: false });
    } else {
      res.json({
        message: " USer  is found",
        student: student,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//seacrh for languseg get api
module.exports.SearchAnyLanguagesName = async (req, res) => {
  const search = req.query.search;
  try {
    const student = await User.find({
      $or: [{ Languages: { $regex: search, $options: "i" } }],
    });
    if (student.length == 0) {
      res.json({ message: "This Languages Is not Found", status: false });
    } else {
      res.json({
        message: "Languages  is found",
        student: student,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Delete User--
module.exports.deleteUserName = async (req, res) => {
  try {
    const DeleteUser = await User.findOneAndDelete({
      User_Name: req.params.user_Name,
    });
    if (!DeleteUser) {
      res.json({ message: "Enter the corret User  Name", status: false });
    } else {
      res
        .status(200)
        .json({ message: "User removed successfully", status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//delete Languages
module.exports.deleteLanguages = async (req, res) => {
  try {
    const DeleteUser = await User.findOneAndDelete({
      $or: [{ Languages: { $regex: search, $options: "i" } }],
    });
    if (!DeleteUser) {
      res.json({ message: "Enter the corret User Languages", status: false });
    } else {
      res
        .status(200)
        .json({ message: "Languages removed successfully", status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//
module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
};
