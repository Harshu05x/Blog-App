const mongoose = require("mongoose");
require("dotenv").config();

// connect with DataBase
exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL,{})
    .then(() => console.log("DB connection successful."))
    .catch((e) => {
        console.log(`Issue in DB connection: ${e.message}`);
        process.exit(1);
    }); 
}