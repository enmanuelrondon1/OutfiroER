import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//FUnction for creating token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Cnotroller function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Cnotroller function for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking if user is already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validate password and checking password strength
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email address",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hanshing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// TODO:CODIGO ORIGINAL
// Cnotroller function for user login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// TODO:CODIGO SACADO DE CLAUDE
// const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
//       // Creamos un payload fijo
//       const payload = {
//         email,
//         role: 'admin',
//         // No incluimos iat ni información temporal
//       };

//       const token = jwt.sign(payload, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "Invalid Credentials"
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// };

export { loginUser, registerUser, adminLogin };
