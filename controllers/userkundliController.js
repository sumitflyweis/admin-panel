const Kundli = require("../models/userKundli");

module.exports.addUserKundli = async (req, res) => {
  console.log(req.file.path);
  const path = req.file.path;
  try {
    let { Image, userName, action } = req.body;
    if (!(userName && action)) {
      res.status(400).json("required filleds is occured");
    }
    var finalImg = {
      data: req.file.path,
      contentType: "image/jpg",
    };
    let getDetails = await Kundli.create({
      Image: finalImg,
      userName,
      action,
      image: path,
    });
    res.status(200).json({
      message: "kundli is Created successfully",
      getDetails,
    });
  } catch (e) {
    res.status(400).json("Error is occured");
  }
};
//
module.exports.updateKundli = async (req, res) => {
  let { Image, userName, action } = req.body;
  const id = req.params.id;
  const path = req.file.path;

  var finalImg = {
    data: req.file.path,
    contentType: "image/jpg",
  };
  try {
    const data = await Kundli.findByIdAndUpdate(id, {
      Image: finalImg,
      userName,
      action,
      image: path,
    });
    res.status(200).json({ message: "Udpate is successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
  const data = await Kundli.findByIdAndUpdate(req.params.id);
};

module.exports.getDetails = async (req, res) => {
  try {
    const data = await Kundli.find();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.deleteKundli = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Kundli.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "delete successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};
