const mongoose = require("mongoose");
const conectionSchema = new mongoose.Schema({

    userID:{type:String},
    followersID:{type:String},
    status:{type:String},
    // id:{type:String}


},
{timestamps: true,
})

module.exports = mongoose.model("conection", conectionSchema);

