const User = require("../models/user");

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch {
    return res.redirect("/login", {
      error: "Incorrect email or password",
    });
  }
};

module.exports = handleUserLogin;
