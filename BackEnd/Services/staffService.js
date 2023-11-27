const Staffs = require("../Models/Staff");

exports.staffsNotApprouved = async () => {
  return await Staffs.find({ status: "notApprouved" });
};
exports.staffsApprouved = async () => {
  return await Staffs.find({ status: "approuved" });
};
exports.approuvingStaff = async (id) => {
  return await Staffs.findByIdAndUpdate(id, { status: "approuved" });
};
exports.deleteStaff = async (id) => {
  return await Staffs.findByIdAndDelete(id);
};
exports.disapprouvingStaff = async (id) => {
  return await Staffs.findByIdAndUpdate(id, { status: "notApprouved" });
};
