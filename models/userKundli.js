const { model, Schema } = require("mongoose");
const userKundliSchema = new Schema(
  {
    Image: {
      type: String,
    },
    userName: {
      type: String,
    },
    action: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("userKundli", userKundliSchema);
