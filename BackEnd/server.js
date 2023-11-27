const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
// Connexion to our database
mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});

// Our Routes
const adminRoutes = require("./Routes/adminRoutes");
app.use("/api/admin", adminRoutes);
const staffRoutes = require("./Routes/staffRoutes");
app.use("/api/staff", staffRoutes);
const classRoutes = require("./Routes/classRoutes");
app.use("/api/classes", classRoutes);
const devicesRoutes = require("./Routes/DevicesRoutes");
app.use("/api/Devices", devicesRoutes);
module.exports = app;
