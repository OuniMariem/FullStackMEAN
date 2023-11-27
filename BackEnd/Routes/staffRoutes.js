const express = require("express");
const router = express.Router();
const staffController = require("../Controllers/staffController");
router.post("/register", staffController.Register);
router.post("/login", staffController.login);
router.get("/staffsNotApprouved", staffController.staffsNotApprouved);
router.get("/staffsApprouved", staffController.staffsApprouved);
router.post("/approuvingStaff/:id", staffController.approuvingStaff);
router.delete("/deleteStaff/:id", staffController.deleteStaff);
router.post("/disapprouvingStaff/:id", staffController.disapprouvingStaff);

module.exports = router;
