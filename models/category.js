const mongoose = require("mongoose");

const categoryschema = new mongoose.schema({

          category:String,
          blog:{type:mongoose.schema.Types.objectId,ref:"blog"},

})

let category=mongoose.model("Category",categoryschema)