const { ObjectId } = require("mongodb");
const Customer = require("../../models/admin-panel-model/customer.model");

module.exports.addCustomer = async (req, res) => {
  try {
    var ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };
    const { id, name, image, phoneNumber, email } = req.body;
    if (!(name && image && phoneNumber && email)) {
      res.status(400).sendStatus({ msg: "filled are required" });
    }
    const data = await Customer.create({
      id: ID(),
      name,
      image,
      phoneNumber,
      email,
    });
    res.status(200).json({ msg: "customer add successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.getCustomers = async (req, res) => {
  try {
    const data = await Customer.find();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.getCustomerById = async (req, res) => {
  try {
    const data = await Customer.findById({ _id: ObjectId(req.params.id) });
    if (!data) {
      res.status(400).json({ msg: "Id does not exist" });
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    res.status(200).json({ data: data });
  } catch (error) {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(error);
    res.status(400).json("Error is occurred");
  }
};

module.exports.updateCustomers = async (req, res) => {
  const { id, name, image, phoneNumber, email } = req.body;
  const ids = req.params.id;

  try {
    const data = await Customer.findByIdAndUpdate(ids, {
      name,
      image,
      phoneNumber,
      email,
    });

    if (!data) {
      res.status(404).json({ msg: "Id does not exist" });
    }
    res.status(200).json({ message: "Udpate is successfully", data });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error is occurred");
  }
  //   const data = await Kundli.findByIdAndUpdate(req.params.id);
};

module.exports.deleteCustomers = async (req, res) => {
  try {
    const data = await Customer.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });

    if (!data) {
      res.status(400).json({ msg: "Id does not exist" });
    }

    res.status(200).send({ msg: "Discount Delete successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, msg: "Id is not created" });
  }
};
