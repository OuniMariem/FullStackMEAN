const express = require("express");
const router = express.Router();
const classController = require("../Controllers/classController");
router.post("/addNewClasse", classController.addNewClasse);
router.get("/getAllClasses", classController.allClass);
router.get("/getClassDetails/:id", classController.classDetails);
router.put("/updateClasses/:id", classController.updateClass);
router.delete("/deleteClass/:id", classController.deleteClass);
router.get("/allDevicesForClass/:id", classController.getDevicesForClass);
router.get("/searchDetailsClass", classController.searchClass);
module.exports = router;
