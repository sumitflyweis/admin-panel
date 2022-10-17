const Banner = require("../models/Banner");
const ObjectId = require("mongodb").ObjectID;

//pos Banner--
module.exports.addBanner = async (req, res) => {
  const banner = req.files;

  try {
    const addImage = banner.forEach(async (element) => {
      const addBanner = await Banner.create({
        bannerImage: element.filename,
      });

      res.status(201).json({
        msg: "Banner successfully added",
        data: banner,
      status:true});
    });
  } catch (error) {
    console.log(error);
  }
};

//Get Banner
module.exports.getBanner = async (req, res) => {
  try {
    const getBanner = await Banner.find();
    res.status(200).json({ data: getBanner });
  } catch (error) {
    console.log(error);
  }
};

//Update Banner--
module.exports.editBanner = async (req, res) => {
  const banner = req.file ? req.file.filename : currentImage;
  try {
    const editBanner = await Banner.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        bannerImage: banner,
      }
    );
    res.status(200).json({ msg: "Banner successfully Updated" });
  } catch (error) {
    console.log(error);
  }
};

//Delete Banner-----
module.exports.deleteBanner = async (req, res) => {
  try {
    const response = await Banner.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({
      msg: "Banner deleted successfully",
      response: response,
      status:true
});
  } catch (error) {
    console.log(error);
  }
};
