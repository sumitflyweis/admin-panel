const { ObjectId } = require("mongodb");
const Inventory = require("../../models/admin-panel-model/inventory");

module.exports.addinventory = async (req, res) => {
  var ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const { id, productDetail, quantity } = req.body;

  // const data = new Inventory({
  //   id: ID(),
  //   productDetail: productDetail,
  //   quantity: quantity,
  // });

  try {
    const result = await Inventory.create({
      id: ID(),
      productDetail,
      quantity,
    });
    res.status(200).send({ msg: "inventory add successfully", result });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports.getInventoryById = async (req, res) => {
  try {
    const data = await Inventory.findById({ _id: ObjectId(req.params.id) });
    res
      .status(200)
      .send({ msg: "Inventory details get successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getInventory = async (req, res) => {
  try {
    const data = await Inventory.find();
    res
      .status(200)
      .send({ msg: "Inventory details get successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
