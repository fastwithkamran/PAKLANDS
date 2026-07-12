const User = require("../models/user");

const handleUpdateProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const { fullName, email, phone } = req.body;

    const user = User.findByIdAndUpdate(
      id,
      { fullName, email, phone },
      { new: true, runValidators: true },
    );

    if (!user) return res.status(400).json({ msg: "User not found" });

    return res.status(200).json({ msg: "Profile Updated" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const field = Object.keys(error.errors)[0];
      return res.status(400).json({ msg: error.errors[field].message });
    }

    console.error("Error Updating Profile ", error);
    return res.status(500).json({ msg: "Error while Updating Profile" });
  }
};

module.exports = handleUpdateProfile;
