const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
router.post("/register", adminController.Register);
router.post("/login", adminController.login);
router.post("/forgot-password", adminController.forgotPassword);
router.post("/reset-password", adminController.resetpassword);
module.exports = router;
