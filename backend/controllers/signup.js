const User = require("../models/user");

const handleUserSignUp = async (req, res) => {
  const { fullName, email, password, cnic, phone, role } = req.body;

  await User.create({
    fullName,
    email,
    cnic,
    phone,
    password,
    role,
  });

  return res.redirect("/");
};

module.exports = handleUserSignUp;
