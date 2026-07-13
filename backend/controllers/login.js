const User = require("../models/user");
require("dotenv").config();

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await User.matchPasswordandGenerateToken(email, password);
    return res
      .status(201)
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
      .json({ msg: "Login Success" });
  } catch (error) {
    if (error.message === "User not found")
      return res.status(400).json({ msg: "Invalid Email" });
    if (error.message === "Incorrect Password or Email")
      return res.status(400).json({ msg: "Incorrect Password or Email" });

    console.error("Error in Login Page ", error);
    return res.status(500).json({ msg: "Cannot Login" });
  }
};

module.exports = handleUserLogin;
