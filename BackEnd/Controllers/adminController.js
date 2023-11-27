const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
function generateRandomKey(length) {
  return crypto.randomBytes(length).toString("hex");
}
const secretKey = generateRandomKey(32);
//Register Function
exports.Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    // Check if this admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send("Email already exists.");
    }
    //crypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create Admin Object
    const admin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });
    //save object
    await admin.save();
    // return a successfully message
    res.status(201).send("Admin registered successfully.");
  } catch (error) {
    // return an error message
    res.status(500).send("An error occurred while registering this Admin.");
  }
};

//Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if this admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("Admin not found.");
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials.");
    }
    // Generate JWT with a specific signature
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || secretKey,
      { expiresIn: "1m" }
    );
    // return a generated Token
    res.json({ token });
  } catch (error) {
    // return a error message if An error occurred while logging
    res
      .status(500)
      .json({ message: "An error occurred while logging in." + error });
  }
};
exports.signout = async (req, res) => {
  try {
    req.token=null
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
//forgot password function
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const existingEmail = await Admin.findOne({ email });
  if (!existingEmail) {
    res.status(400).send("email not exist ");
  } else {
    const newSecret = secretKey + existingEmail.password;
    const token = jwt.sign(
      { email: existingEmail.email, id: existingEmail._id },
      process.env.JWT_SECRET || newSecret
    );
    const Link = `http://localhost:4200/resetPassword?token=${token}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "lafinoura6@gmail.com",
        pass: "gjzgmvdawoxpdiug",
      },
    });
    const mailOptions = {
      from: "lafinoura@gmail.com",
      to: existingEmail.email,
      subject: "Forgot password",
      text: Link,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send("Error while sending an e-mail : ");
      } else {
        res.json({ data: "ok" });
      }
    });
  }
};

exports.resetpassword = async (req, res) => {
  try {
    console.log("ok");
    const { email, password } = req.body;
    const oldAdmin = await Admin.findOne({ email: email });
    console.log("ok1", oldAdmin);
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.findByIdAndUpdate(oldAdmin.id, { password: hashedPassword });
    res.status(200).json({ message: "password updated" });
  } catch (err) {
    res
      .status(400)
      .json({ message: " an error occured while updating password" });
  }
};
