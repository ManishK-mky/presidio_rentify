//Protecting the routes using JWT

const JWT = require("jsonwebtoken");
const User = require('../models/userModel.js')

//Protected Routes token base

async function requireSignIn(req,res,next){
    try{
        // console.log(req.headers.authorization);
        const decode = JWT.verify(req.headers.authorization , 'its-my-ninja-way')

        req.user = decode;
        next();
    }catch(error){
        console.log(error);
    }
}

async function isAdmin(req,res,next){
    try{
        const user = await User.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success : false,
                message : "Unauthorized Access",  //matlab hamara user admin nhi hai --> 0 means user and 1 means ADMIN
            })
        }else{
            next();
        }
    }
    catch(error){
        console.log(error);
        res.status(401).send("error in admin middleware")
    }
}

module.exports = {requireSignIn , isAdmin};