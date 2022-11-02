const { model, Schema } = require("mongoose");
const userKundliSchema = new Schema(
  {
    Image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
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
