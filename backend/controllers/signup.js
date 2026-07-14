const User = require("../models/user");
require("dotenv").config();

const handleUserSignUp = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    const emailDuplicate = await User.findOne({ email });
    if (emailDuplicate)
      return res.status(400).json({ msg: "This Email is already in use" });

    const phoneDuplicate = await User.findOne({ phone });
    if (phoneDuplicate)
      return res.status(400).json({ msg: "This Phone is already in use" });

    const avatorUrl = req.file
      ? req.file.secure_url
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNupSKjnCIs8Z8mbmI3Nm1Huhj_wEEm-BQo522KiZjAg&s=10";

    await User.create({
      fullName,
      email,
      phone,
      password,
      avator: avatorUrl,
    });

    const token = await User.matchPasswordandGenerateToken(email, password);

    return res
      .status(201)
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 90 * 24 * 60 * 60 * 1000,
      })
      .json({ msg: "Account Created" });
  } catch (error) {
    if (error.message === "User not found")
      return res.status(400).json({ msg: "Invalid Email" });
    if (error.message === "Incorrect Password or Email")
      return res.status(400).json({ msg: "Incorrect Password or Email" });

    if (error.name === "ValidationError") {
      const field = Object.keys(error.errors)[0];
      return res.status(400).json({ msg: error.errors[field].message });
    }

    console.error("Error in SignUp ", error);
    return res.status(500).json({ msg: "Account Not Created" });
  }
};

module.exports = handleUserSignUp;
