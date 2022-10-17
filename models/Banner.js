
const { model, Schema } = require("mongoose");
const bannerSchema = new Schema(
  {
    bannerImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("banner", bannerSchema);
