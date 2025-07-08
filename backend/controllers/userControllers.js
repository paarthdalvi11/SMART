const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const setUser = async (req, res) => {
  try {
    const data = req.body;
    const newEntry = new User(data);
    const result = await newEntry.save();

    if (result) return res.status(201).json({ Message: "User Created" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ Error: "No User Found" });
    const isPasswordMatch = password === user.password ? true : false;
    if (!isPasswordMatch) return res.status(400).json({ Error: "Incorrect Password" });

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    user.token = token;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: "Login failed" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.json({ message: "Logout successful" });
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ username: decoded.username, role: decoded.role });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  setUser,
  getUser,
  loginUser,
  logoutUser
};
