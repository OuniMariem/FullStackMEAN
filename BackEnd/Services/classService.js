const modelClass = require("../Models/Class");

exports.allClasses = async () => {
  return await modelClass.find();
};

exports.getClassById = async (id) => {
  return await modelClass.findById(id);
};

exports.addNewClass = async (classForAdding) => {
  console.log("ttt", classForAdding);
  return await modelClass.create(classForAdding);
};

exports.updateClass = async (
  id,
  name,
  type,
  building,
  note,
  capacityOfStudent,
  department
) => {
  return await modelClass.findByIdAndUpdate(id, {
    name: name,
    type: type,
    building: building,
    note: note,
    capacityOfStudent: capacityOfStudent,
    department: department
  });
};
exports.deleteClass = async (id) => {
  return await modelClass.findByIdAndDelete(id);
};
exports.detailsClass = async (name) => {
  return await modelClass.find({ name: name });
};
