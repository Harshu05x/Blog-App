const express = require("express");
const router = express.Router();

// Import middlerwares
const { auth, isOwner} = require("../middlerwares/auth");

// Import Controllers 
const { createBlog, editBlog, getBlogDetails, getAllBlogs, deleteBlog} = require("../controllers/blog");

// ----------------------------------- [ Blog Routes ] --------------------------------------------------
router.get("/getblog/:blogId", getBlogDetails);
router.get("/getAllblogs", getAllBlogs);
router.post("/createBlog", auth, createBlog);
router.post("/editblog", auth, isOwner, editBlog);
router.delete("/deleteblog", auth, isOwner, deleteBlog);

// Export router
module.exports = router;

