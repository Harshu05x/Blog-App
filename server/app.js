// Imports
const express = require("express");
const fileUpload = require("express-fileupload");
const { dbConnect } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Import routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

// Define port
const PORT = process.env.PORT || 5000;

// Connect with Database
dbConnect();


// Add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Mount the routes
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1", blogRoutes);

// Default Route
app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running..."
    })
})

// Listen server
app.listen(PORT, (req,res) => {
    console.log(`Server started successfully on port ${PORT}`);
})

