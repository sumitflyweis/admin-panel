const { model, Schema } = require("mongoose");
const userKundliSchema = new Schema(
  {
    Image: {
      data: Buffer,
      contentType: String,
    },
    image: {
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
