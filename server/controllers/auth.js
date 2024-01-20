const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller for Registering Users
exports.signUp = async (req,res) => {
    try {
        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = req.body;

        // validate
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        };
        
        // match password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: " Passwords do not match."
            });
        };
        
        // check user already present
        const existingUser = await User.findOne({email}); 
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already regsitered."
            });
        };

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // save entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // send response 
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully."
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered."
        });
    }
}


// Login controller for authenticating users
exports.login = async(req,res) => {
    try {
        // fetch data
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // check user exists 
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered with us, please sign up first."
            });
        }
        
        // match password
        const passwordMatched = await bcrypt.compare(password,user.password);
        if(!passwordMatched){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });   
        }

        // generate JWT token ans send in response
        const payload = {
            email: user.email,
            id: user._id,
        }
        const token = JWT.sign(payload,process.env.JWT_SECERT,{
            expiresIn: "24h"
        })

        user.token = token;
        user.password = undefined;

        // send response with cookie
        const options = {
            expires: new Date (Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token",token,options).status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully"
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be logged In."
        });
    }
}