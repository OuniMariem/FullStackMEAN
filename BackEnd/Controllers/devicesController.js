const devicesService = require("../Services/devicesService");
const Devices = require("../Models/Devices");
// adding a new device

exports.addNewDevice = async (req, res) => {
  try {
    console.log(req.body);
    const { classId, reference, brand, note } = req.body;
    const deviceForAdding = new Devices({ classId, reference, note, brand });
    await devicesService.addDevice(deviceForAdding);
    res.status(200).json({ message: "Adding Device with succes." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding this Device !!." + error,
    });
  }
};

// getting a specific device
exports.getDeviceById = async (req, res) => {
  try {
    const id = req.params.id;
    const device = await devicesService.getDeviceById(id);
    console.log("eee", device);
    if (device) res.status(201).json(device);
    else res.status(400).json({ message: "device not exists !!!" });
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while getting this device !!! " + err,
    });
  }
};

// updating a specific device
exports.updateDevice = async (req, res) => {
  try {
    const id = req.params.id;
    const { reference, brand, note, classId } = req.body;
    console.log(req.body);
    if (id) {
      await devicesService.updateDevice(id, reference, brand, note, classId);
      res.status(201).json({ message: " Device updated Successfully " });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: " An Error occured while updating Device " + err });
  }
};

// getting all devices
exports.getAllDevices = async (req, res) => {
  try {
    const allDevices = await devicesService.getAllDevices();
    if (allDevices) res.status(201).json(allDevices);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An Error occured while getting all Devices" });
  }
};

//deleting a device
exports.deleteDevice = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await devicesService.deleteDevice(id);
      res.status(201).json({ message: " Device deleted Successfully " });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: " An Error occured while deleting this device !!! " });
  }
};

exports.getDevicesForClass = async (req, res) => {
  try {
    const idClass = req.params.id;
    if (idClass) {
      const DevicesForClass = await devicesService.getDevicesForClass(idClass);
      if (DevicesForClass) res.status(201).json(DevicesForClass);
      else res.status(400).json({ message: " this class have not devices" });
    }
  } catch (err) {
    res.status(500).json({
      message: "An Error occured while getting all devices for this class !!! ",
    });
  }
};
