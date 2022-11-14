const expressAsyncHandler = require("express-async-handler");
const AddTime = require("../models/addtime");

const UploadDocuments = require("../models/uploaddocuments");
module.exports.addAstrologerTime = expressAsyncHandler(async (req, res) => {
  const { day, time } = req.body;
  if (!(day && time)) {
    res.status(400).send("Required filleds");
  }
  try {
    const data = await AddTime.create({ day, time });
    console.log(data);
    res.status(200).send({ msg: "time added", data: data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports.getTime = expressAsyncHandler(async (req, res) => {
  try {
    const data = await AddTime.find();

    res.status(200).send({ msg: "time get successfully", data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports.deleteTime = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await AddTime.findByIdAndDelete(id);

    res.status(200).send({ msg: "time delete", data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports.updateTime = expressAsyncHandler(async (req, res) => {
  const { day, time } = req.body;
  const id = req.params.id;
  try {
    const data = await AddTime.findByIdAndUpdate(id, { day, time });

    res.status(200).send({ msg: "time added", data });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports.uploadAstrologerDocuments = expressAsyncHandler(
  async (req, res) => {
    const uploadDocuments = req.body;
    if (!uploadDocuments) {
      res.status(400).send("Required filleds");
    }
    try {
      const data = await UploadDocuments.create(uploadDocuments);
      console.log(data);
      res.status(200).send({ msg: "documents added", data: data });
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
