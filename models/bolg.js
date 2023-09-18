const mongoose = require("mongoose");

const blogSchema=new mongoose.Schema({
      
    title:String,
    content:String,
    Image:String,
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:"true"}

})

const blog=mongoose.model("blog",blogSchema);

module.exports=blog