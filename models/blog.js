const mongoose = require("mongoose");
const ourBlogSchema = new mongoose.Schema({

    Date:{type:String},
    
    sub_Title:{type:String},
    
    blog_Images:[{ type: String }],
    
    User_Name: { type: String },
    
    Intro:{type:String}


},
{timestamps: true,
})

module.exports = mongoose.model("blog", ourBlogSchema);

