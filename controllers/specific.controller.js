const Admin = require("../models/Admin");
const Specific = require("../models/specification");
module.exports.addSpecification = async (req, res) => {
  try {
    console.log(req.user);
    let { specification, data } = req.body;
    let data2 = await Admin.findOne({ user: req.user });
    let getDetails = new Specific({
      user: data2,
      specification: specification,
      data: data,
    });

    let data1 = await getDetails.save();
    res.status(200).json({
      message: "Specific is Created successfully",
      data1,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.getDetails = async (req, res) => {
  try {
    const data = await Specific.find();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};
