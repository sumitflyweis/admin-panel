const Discount = require("../models/discount");
const Admin = require("../models/astrologerSchema");
module.exports.discount = async (req, res) => {
  try {
    let { productName, discount } = req.body;

    console.log(req.user);
    let data2 = await Admin.findOne({ user: req.user });
    let getDetails = await Discount.create({
      user: data2,
      productName,
      discount,
    });
    res.status(200).json({
      message: "discount is Created successfully",
      getDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json("Error is occured");
  }
};

module.exports.updatediscount = async (req, res) => {
  let { productName, discount } = req.body;
  const data = await Discount.findByIdAndUpdate(req.params.id, {
    productName,
    discount,
  });
  res.status(200).json({ message: "Udpate is successfully", data });
};

module.exports.getalldiscount = async (req, res) => {
  try {
    const data = await Discount.find();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};
