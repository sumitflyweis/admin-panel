const { ObjectId } = require("mongodb");
const Product = require("../../models/admin-panel-model/product.model");



module.exports.addProduct= async (req, res) => {
    var ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };
    const { id, image,name,mrp,stock,variant,category } = req.body;
  
    const data = new Product({
      id: ID(),
      image:image,
      name :name,
      mrp:mrp,
      stock:stock,
      variant:variant,
      category:category
    });
  
    try {
      const result = await data.save();
      res.status(200).json({ msg: "product added successfully", result });
    } catch (error) {
      res.status(500).json(error);
    }
  };


  module.exports.getProduct = async(req,res)=>{
      try {
          const data = await Product.find();
          res.status(200).json({msg :"product get successfully" , data})
      } catch (error) {
        res.status(500).json(error);
      }
  }

  module.exports.getProductById = async(req,res)=>{
    try {
    
        const data = await Product.findById({ _id:  ObjectId(req.params.id) });
        res.status(200).json({msg :"product get successfully" , data})
    } catch (error) {
      res.status(500).json(error);
    }
}


module.exports.updateProduct = async(req,res)=>{
    try {
       
        const { image,name,mrp,stock,variant,category } = req.body;
        const data = await Product.findByIdAndUpdate({ _id:  ObjectId(req.params.id) , image,name,mrp,stock,variant,category });
        res.status(200).json({msg :"product update successfully" , data})
    } catch (error) {
      res.status(500).json(error);
    }
}

module.exports.deleteProduct= async(req,res)=>{

    
    try {
        const data = await Product.findByIdAndDelete({ _id: ObjectId(req.params.id) })

        res.status(200).send({ msg: "Delete successfully", data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
  }
