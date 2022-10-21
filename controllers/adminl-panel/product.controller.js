const { ObjectId } = require("mongodb");
const ManageCategory = require("../../models/admin-panel-model/manage-category.model");
const Product = require("../../models/admin-panel-model/product.model");

module.exports.addProduct = async (req, res) => {
  var ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const { id, image, name, mrp, stock, variant, category } = req.body;

  const data = new Product({
    id: ID(),
    image: image,
    name: name,
    mrp: mrp,
    stock: stock,
    variant: variant,
    category: category,
  });
  const data2 = await ManageCategory.findById(category);
  try {
    const result = await await data.save();
    console.log(data2);
    res.status(200).json({ msg: "product added successfully", result , category : data2 });
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({ msg: "product get successfully", data });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const data = await Product.findById({ _id: ObjectId(req.params.id) });
    res.status(200).json({ msg: "product get successfully", data });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { image, name, mrp, stock, variant, category } = req.body;
    const id = req.params.id;

    const data = await Product.findByIdAndUpdate(id, {
      image,
      name,
      mrp,
      stock,
      variant,
      category,
    });
    const categorys = await ManageCategory.findById({});
    res.status(200).json({ msg: "product update successfully", data });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });

    res.status(200).send({ msg: "Delete successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
