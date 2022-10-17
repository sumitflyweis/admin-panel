const userDetails = require('../models/userDetails');
const UserDetail = require('../models/userDetails')
// onst UserDetail = require('../models/userDetails')
//post api--

module.exports.postuserProfiles = async (req, res) => {
  let photo = req.body
  photo['User_Images'] = [req.file.originalname]
  let { User_ID, User_Name, Experince, Skills, AboutMe, User_Images, Languages } = photo;

  try {
    if (!(User_ID && User_Name && Experince && Skills && AboutMe && User_Images && Languages)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await UserDetail.create({
        User_ID,
        User_Name,
        Experince,
        Skills: JSON.parse(Skills),
        AboutMe,
        User_Images,
        Languages: JSON.parse(Languages),
      });

      if (!getResponce) {
        res.status(400).json({ message: "UserDetails  is not created", status: false });
      } else {
        res.status(200).json({
          message: "UserDetails is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//get api

module.exports.ViewDataProfiles = async (req, res) => {
  try {
    const getDetails = await  UserDetail.findOne({ id: req.params.id });
    if (!getDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({
        message: "User Details is Created successfully",
        data:getDetails,
        status: true
      });

    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//patch api

module.exports.updateUserProfile = async (req, res) => {
  const id = req.params.id
  let photo = req.body
  photo['User_Images'] = [req.file.originalname]
  const { User_ID, User_Name, Experince, Skills, AboutMe, User_Images, Languages } = req.body;
  console.log("req.user", req.user);

  if (!(User_ID && User_Name && Experince && Skills && AboutMe && User_Images && Languages)) res.status(400).json({ message: "Reuired fields" });
  const UpdateUser = await UserDetail.findByIdAndUpdate(id, { User_ID, User_Name, Experince, Skills: JSON.parse(Skills), AboutMe, User_Images, Languages: JSON.parse(Languages) });
  if (!UpdateUser) res.status(400).json({ message: "Enter the correct Id", status: false });
  res.status(200).json({
    message: 'Udpate is successfully', status: true, UpdateUser
  })

}



//Search api
module.exports.SearchUserNameLangSkills = async (req, res) => {
  const search = req.query.search
  try {
    const student = await UserDetail.find({ $or: [{ User_Name: { "$regex": search, "$options": "i" } }, { Skills: { "$regex": search, "$options": "i" } }, { Languages: { "$regex": search, "$options": "i" } }] });
    if (student.length == 0) {
      res.json({ message: "Data is not Found", status: false });
    } else {
      res.json({
        message: " Data  is found Successfully",
        student: student,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};



// Serach api User Name
module.exports.SearchUserName = async (req, res) => {
  const search = req.query.search
  try {
    const student = await userDetails.find({ $or: [{ User_Name: { "$regex": search, "$options": "i" } },] });
    if (student.length == 0) {
      res.json({ message: "This User Is not Found", status: false });
    } else {
      res.json({
        message: " USer  is found",
        student: student,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//seacrh for languseg get api
module.exports.SearchAnyLanguagsrName = async (req, res) => {
  const search = req.query.search
  try {
    const student = await UserDetail.find({ $or: [{ Languages: { "$regex": search, "$options": "i" } },] });
    if (student.length == 0) {
      res.json({ message: "This Languges Is not Found", status: false });
    } else {
      res.json({
        message: " Languages  is found",
        student: student,
        status: true
      });

    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Delete User--
module.exports.deleteUserName = async (req, res) => {
  try {
    const DeleteUser = await userDetails.findOneAndDelete({ User_Name: req.params.user_Name });
    if (!DeleteUser) {
      res.json({ message: "Enter the corret User  Name", status: false });
    } else {
      res.status(200).json({ message: " User removed  successfully", status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//delete Languages
module.exports.deleteLanguages = async (req, res) => {
  try {
    const DeleteUser = await userDetails.findOneAndDelete({Languages: req.params.language});
    if (!DeleteUser) {
      res.json({ message: "Enter the corret User Languages", status: false });
    } else {
      res.status(200).json({ message: " Languages  removed  successfully", status: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//