const { ObjectId } = require("mongodb");
const ManageCategory = require("../../models/admin-panel-model/manage-category.model");

module.exports.addCategory = async (req, res) => {
  try {
    var ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

    const { id, name, product, subCategory } = req.body;
    const data = await ManageCategory.create({
      id: ID(),
      name,
      product,
      subCategory,
    });
    res.status(200).json({ msg: "customer add successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.addSubCategory = async (req, res) => {
  const id = req.params.id;

  const { subCategory, name } = req.body;
  try {
    const data = await ManageCategory.findByIdAndUpdate(id,
      {
        //_id: ObjectId(req.params.id),
        subCategory,
        name,
      },
      { $push: { subCategory: subCategory } }
    );

    if (!data) {
      res.status(400).json({ msg: "Id does not exist" });
    }

    res.status(200).json({ msg: "subcategory update successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.getSubCategory = async (req, res) => {
  try {
    const data = await ManageCategory.find();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const data = await ManageCategory.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });

    if (!data) {
      res.status(400).json({ msg: "Id does not exist" });
    }

    res.status(200).send({ msg: " Delete successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, msg: "Id is not created" });
  }
};
