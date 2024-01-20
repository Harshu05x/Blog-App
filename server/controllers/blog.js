const User = require("../models/User");
const blog = require("../models/blog");


// Create a new Blog post
exports.createBlog = async(req,res) => {
    try {
        // Fetch data 
        const {title,summary,content, id} = req.body;
        console.log(title,id);
        // Validation
        if(!title || !summary || !content){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // User validation
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User details not found."
            });
        }

        // create new blog save entry in Database
        const newBlog = await blog.create({
            title,
            summary,
            content,
            user: user._id,
        });

        // add new blog id into user schema also
        const userDetails = await User.findByIdAndUpdate(
            {_id: user._id},
            {
                $push: {
                    blogs: newBlog._id,
                }
            },
            {new: true}
        )
        // send response
        return res.status(200).json({
            success: true,
            data: newBlog,
            message: "New Blog created successfully.."
        });
        

    } catch (error) {
        console.log("Error: " ,error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating a new blog."
        });
    }
}

// Edit a Blog post
exports.editBlog = async(req,res) => {
    try {
        // Fetch data 
        const {title,summary,content,blogId} = req.body;
        // get id
        const id = req.user.id;

        // Validation
        if(!title || !summary || !content || !blogId){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // create new blog save entry in Database
        const editedBlog = await blog.findByIdAndUpdate(
            {_id: blogId},
            {
                title: title,
                summary: summary,
                content: content,
                user: id,
            },
            {new: true}
        );

        // send response
        return res.status(200).json({
            success: true,
            data: editedBlog,
            message: "Blog edited successfully."
        });
        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while editing a blog."
        });
    }
}

// get blog details
exports.getBlogDetails = async(req,res) => {
    try {
        // get blog id
        const blogId = req.body.blogId || req.params.blogId;

        // Validation
        const blogDetails = await blog.findById({_id: blogId}).populate("user").exec();
        if(!blogDetails){
            return res.status(404).json({
                success: false,
                message: `No blog details found for Id: ${blogId}`
            });
        }

        // details found then send response
        return res.status(200).json({
            success: true,
            data: blogDetails,
            message: "Blog details found successfully."
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while fetching blog details."
        });
    }
}

// get all blogs 
exports.getAllBlogs = async(req,res) => {
    try {
        
        // Validation
        const allBlogs = await blog.find(
            {},
            {
                title: true,
                summary: true,
                user: true,
                content: true,
                createdAt: true
            }
        ).sort({createdAt: -1}).populate("user").exec();
        if(!allBlogs || allBlogs.length === 0){
            return res.status(200).json({
                success: true,
                message: `No blogs found.`
            });
        }

        // details found then send response
        return res.status(200).json({
            success: true,
            data: allBlogs,
            message: "All Blogs fetched successfully."
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while fetching all blogs."
        });
    }
}

// Delete a blog
exports.deleteBlog = async(req,res) => {
    try {
        // get blog id
        const blogId = req.body.blogId || req.params.blogId;

        // validation
        if(!blogId){
            return res.status(403).json({
                success: false,
                message: `Invalid blog Id.`
            });
        }

        // Delete 
        const blogDetails = await blog.findByIdAndDelete({_id: blogId});

        // take out the blog from user schema also
        await User.findByIdAndUpdate(
            {_id: blogDetails.user},
            {
                $pull: {
                    blogs: blogDetails._id
                }
            },
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully."
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting a blog."
        });
    }
}