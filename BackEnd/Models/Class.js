const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    capacityOfStudent: {
      type: Number,
      required: true,
    },
  },
  { collection: "Class" }
);

module.exports = mongoose.model("Class", ClassesSchema);
