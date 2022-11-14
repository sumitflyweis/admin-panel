const { ObjectId } = require("mongodb");
const Order = require("../../models/admin-panel-model/order.model");

module.exports.addOrder = async (req, res) => {
  var ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const { id, customer, order, deliveryDate, orderValue, payment } = req.body;

  const data = new Order({
    id: ID(),
    customer,
    order,
    deliveryDate,
    orderValue,
    payment,
  });

  try {
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    const data = await Order.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const data = await Order.findById({ _id: ObjectId(req.params.id) });
    res.status(200).send({ msg: "order details get successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndDelete({
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
