const Devices = require("../Models/Devices");
exports.addDevice = async (device) => {
  return await Devices.create(device);
};
exports.updateDevice = async (id, reference, brand, note, classId) => {
  return await Devices.findByIdAndUpdate(id, {
    reference: reference,
    brand: brand,
    note: note,
    classId: classId,
  });
};
exports.getAllDevices = async () => {
  return await Devices.find();
};
exports.deleteDevice = async (id) => {
  return await Devices.findByIdAndDelete(id);
};
exports.getDeviceById = async (id) => {
  return await Devices.findById(id);
};
exports.getDevicesForClass = async (classId) => {
  // console.log("jj", idClass);
  return await Devices.find({ classId: classId });
};
