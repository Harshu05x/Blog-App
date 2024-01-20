const express = require("express");
const router = express.Router();

// Import Controllers 
const { signUp, login} = require("../controllers/auth");

// ----------------------------------- [ Auth Routes ] --------------------------------------------------
router.post("/signup", signUp);
router.post("/login", login);

// Export router
module.exports = router;