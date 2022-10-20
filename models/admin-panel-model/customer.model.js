const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      data :Buffer,
    contentType :String
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      minlength : 10,
      
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
