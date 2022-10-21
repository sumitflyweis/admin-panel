const { ObjectId } = require("mongodb");
const Discount = require("../../models/admin-panel-model/discount.model");

module.exports.addDiscount= async (req, res) => {
    var ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
 

    const { id, name ,discountPercentage, couponCode , startingdate, endDate } = req.body;
  
    const data = new Discount({
      id: ID(),
      name:name,
     discountPercentage : discountPercentage,
     couponCode: generateString(4),
     startingdate:startingdate,
     endDate:endDate,
    });                                           
  
    try {
      const result = await data.save();
      res.status(200).json({ msg: "discount added successfully", result });
    } catch (error) {
      res.status(500).json(error);
    }
  };



  module.exports.deleteDiscount = async(req,res)=>{

    
    try {
        const data = await Discount.findByIdAndDelete({ _id: ObjectId(req.params.id) })

        res.status(200).send({ msg: "Discount Delete successfully", data: data });
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
  }

  module.exports.getDiscountDetails = async(req,res) =>{
      try {
        const data = await Discount.find();
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
      }
  }