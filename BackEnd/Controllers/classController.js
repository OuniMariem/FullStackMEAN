const MdlClass = require("../Models/Class");
const classServ = require("../Services/classService");
const deviceSer = require("../Services/devicesService");
// Adding a new class
exports.addNewClasse = async (req, res) => {
  try {
    const { name, type, note, capacityOfStudent, building } = req.body;
    console.log("yyy", req.body);
    const ClassForAdding = new MdlClass({
      name,
      type,
      note,
      capacityOfStudent,
      building,
    });
    console.log("ttt", ClassForAdding);
    await classServ.addNewClass(ClassForAdding);
    res.status(200).json({ message: "Adding class with success." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while adding this class !!." + error,
    });
  }
};
// Generating all classes exist in our database
exports.allClass = async (req, res) => {
  try {
    console.log("eex", req.adminId);
    const classes = await classServ.allClasses();
    res.status(201).send(classes);
  } catch (error) {
    res.status(500).json({ error: "error getting all classes" });
  }
};
// Generating details for a specific class
exports.classDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const classExist = await classServ.getClassById(id);
    if (classExist) {
      res.status(201).json(classExist);
    } else res.status(400).json({ message: " class not exist " });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while getting this class " });
  }
};
// updating a specific class
exports.updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, building, note, capacityOfStudent } = req.body;
    console.log(req.body);
    if (id) {
      await classServ.updateClass(
        id,
        name,
        type,
        building,
        note,
        capacityOfStudent
      );
      res.status(201).json({ message: " class updated Successfully " });
    }
  } catch (err) {
    res.status(500).json({ message: " Error while updating class " + err });
  }
};
// deleting a specific class
exports.deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await classServ.deleteClass(id);
      res.status(201).json({ message: " class deleted Successfully " });
    }
  } catch (err) {
    res.status(500).json({ message: " Error while deleting this class " });
  }
};
//list of devices for a specific class
exports.getDevicesForClass = async (req, res) => {
  try {
    const idClass = req.params.id;
    console.log(idClass);
    if (idClass) {
      const DevicesForClass = await deviceSer.getDevicesForClass(idClass);
      if (DevicesForClass) res.status(201).json(DevicesForClass);
      else res.status(400).json({ message: " this class have not devices" });
    }
  } catch (err) {
    res.status(500).json({
      message: "An Error occured while getting all devices for this class !!! ",
    });
  }
};
exports.searchClass = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const classDetails = await classServ.detailsClass(name);
      if (classDetails) res.status(201).json(classDetails);
    }
  } catch (err) {
    res.status(500).json({
      message: "An Error occured while getting details for this class !!! ",
    });
  }
};
