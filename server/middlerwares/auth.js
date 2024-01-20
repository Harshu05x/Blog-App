const jwt = require("jsonwebtoken");
const blog = require("../models/blog");
require("dotenv").config();

// Authentication
exports.auth = (req,res,next) => {
    try{
        // Extract the token
        const token = req.body.token || 
                      req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        };

        // Decode Token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECERT);
            console.log(decode);
            req.user = decode;
            
        }catch(e){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        };

        // Go to next middleware
        next();
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Someting went wrong while token validation"
        })
    }
}

// Authorization
exports.isOwner = async (req,res,next) => {
    try {
        // get blog id
        const {blogId} = req.body;
        // validation
        console.log("isOwner auth", blogId);
        const blogDetails = await blog.findById(blogId);
        if(!blogDetails){
            return res.status(404).json({
                success: false,
                message: "Blog details not found"
            });
        }

        // get user id
        const userId = blogDetails.user.toString();
        if(req.user.id !== userId){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Creator of this Blog only."
            })
        }
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Someting went wrong while Authorization"
        })
    }
}