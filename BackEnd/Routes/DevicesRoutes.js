const express = require("express");
const router = express.Router();
const devicesController = require("../Controllers/devicesController");
router.post("/addNewDevice", devicesController.addNewDevice);
router.get("/getDeviceById/:id", devicesController.getDeviceById);
router.get("/getAllDevices", devicesController.getAllDevices);
router.put("/updateDevices/:id", devicesController.updateDevice);
router.delete("/deleteDevice/:id", devicesController.deleteDevice);
module.exports = router;
