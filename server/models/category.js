const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique : true,
    },
    slug : { //check it about slug from npm.com ---- nice package
        type : String,
        lowercase : true,
    }
})

module.exports =  mongoose.model("Category" , categorySchema)