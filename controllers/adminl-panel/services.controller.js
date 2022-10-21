const { ObjectId } = require("mongodb");
const Service = require("../../models/admin-panel-model/services.model");
const { find } = require("../../models/User");

module.exports.addServices = async (req, res) => {
  var ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  try {
    const { image, name, id, category, price } = req.body;

    const data = new Service({
      id: ID(),
      image: image,
      name: name,
      category: category,
      price: price,
    });

    const result = await data.save();
    res.status(200).json({ msg: "product added successfully", result });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getServices = async (req, res) => {
  try {
    const result = await Service.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getServicesById = async (req, res) => {
  try {
    const result = await Service.findById({ _id: ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateServices = async (req, res) => {
  try {
    const id = req.params.id;
    const { image, name, category, price } = req.body;
    if (!(image && name && category && price))
      res.status(400).json({ message: "Required fields" });

    const data = await Service.findByIdAndUpdate(id, {
      name,
      image,
      category,
      price,
    });

    if (!data) {
      res.status(400).json({ msg: "Id does not exist" });
    }
    res.status(200).json({ message: "Udpate is successfully", data });
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

module.exports.deleteServices = async (req, res) => {
  try {
    const data = await Service.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });

    res.status(200).send({ msg: "Discount Delete successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, msg: "Id is not created" });
  }
};
