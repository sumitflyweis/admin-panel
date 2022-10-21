const mongoose = require("mongoose");

const manageCategorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    product: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        type: String,
      },
    ],
    name: {
      type: String,
    },
    // product2: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   ref: "Product",
    // },
  },
  { timestamps: true }
);

const ManageCategory = mongoose.model("manageCategory", manageCategorySchema);
module.exports = ManageCategory;
