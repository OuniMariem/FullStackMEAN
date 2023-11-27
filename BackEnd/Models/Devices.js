const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devicesSchema = new Schema(
  {
    classId: {
      type: mongoose.Schema.ObjectId,
      ref: "Class",
    },
    refference: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { collection: "Devices" }
);

module.exports = mongoose.model("Devices", devicesSchema);
