const mongoose = require("mongoose");

const HoroScopeSchema = new mongoose.Schema(
  {
    date: { type: String },

    horoScope: { type: String },

    profession: { type: String },

    emotion: { type: String },

    health: { type: String },

    travel: { type: String },

    love: { type: String },
    luck: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("horoScope", HoroScopeSchema);
