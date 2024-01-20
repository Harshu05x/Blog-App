const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    content: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    // Future Scope
    // 1] Like, Unlike 
    // 2] Comment 
})


module.exports = mongoose.model("Blog",blogSchema);