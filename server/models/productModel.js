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
    quantity : {
        type : Number,
        required : true,
    },
    photo : {
        data : Buffer,
        contentType : String 
    },
    shipping : {
        type : Boolean  
    }
}, {
    timestamps : true}
)

module.exports = mongoose.model( "Product", productModel );