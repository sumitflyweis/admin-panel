const { model, Schema } = require("mongoose");
const bannerSchema = new Schema(
  {
    bannerImage: {
      data: Buffer,
      contentType: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = model("banner", bannerSchema);
