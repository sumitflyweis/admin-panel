const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    id: {
      type: String,
    },
    name: {
      type: String,
      required : true
    },
    category: {
      type: String,
      required : true
    },
    price: {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("service", servicesSchema);

module.exports = Service;
