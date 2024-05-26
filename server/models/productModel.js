const mongoose = require("mongoose");

const productModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        required :true
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : String ,
        required : true
    },
    category : {
        type : mongoose.ObjectId,
        ref : "Category",  //referencing to Category model
        required : true
    },
    location : {
        type:String,
        required : true  
    },
    photo : {
        data : Buffer,
        contentType : String 
    }
    
}, {
    timestamps : true}
)

module.exports = mongoose.model( "Product", productModel );