const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userModel = require('../models/userModel');

async function register(req, res) {
    try {
        // Extracting values from req.body
        const { first_name, last_name, email, password, phone, answer, address, role } = req.body;
        
        // Check if required fields are missing
        if (!first_name || !last_name || !email || !password || !phone || !answer || !address || role == null) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if the email is already in use
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(422).send({
                success: false,
                message: 'This email is already in use'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            answer,
            address,
            role
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).send({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// LOGIN

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email }); //db mein user ko find kar rhe hai using email becz email is unique
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        //token

        const token = await jwt.sign({ _id: user._id }, 'its-my-ninja-way', { expiresIn: '7d' });
        console.log(token);
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user : {
                firstname : user.first_name,
                lastname : user.last_name,
                email : user.email,
                phone : user.phone ,
                address : user.address,
                role : user.role
            },
            token  //sending the token to frontend so that , it can fonud that which user is loggedin
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login'
        });
    }
}

// FORGOT PASSWORD

async function forgotPasswordController(req,res){
    try{
        const {email , answer , newPassword} = req.body;

        if(!email){
            res.status(400).send({
                message : "Email is requires",
            })
        }

        if(!answer){
            res.status(400).send({
                message : "Answer is required",
            })
        }

        if(!newPassword){
            res.status(400).send({
                message : "New pasword is required for updating the password"
            })
        }

        //chekcing the emial and answer

        const user = await userModel.findOne({email , answer})

        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Wrong Email or Answer"
            })
        }

        console.log(user);
        const hashedPassword = await bcrypt.hash(newPassword , 10);

        await userModel.findByIdAndUpdate(user._id , {password : hashedPassword})
        return res.status(200).send({
            success : true,
            message : "Password Reset Successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false ,
            message : "Something went wrong",
            error
        })
    }
}


function testRoute(req,res){
    console.log("protected route");
    res.send("protected routes")
}

module.exports = {register , login , forgotPasswordController , testRoute}