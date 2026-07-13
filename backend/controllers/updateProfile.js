const User = require("../models/user");

const handleUpdateProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const { fullName, email, phone } = req.body;

    let avator = req.file ? req.file.secure_url : undefined;

    if (email) {
      const emailDuplicate = User.findOne({ email });
      if (emailDuplicate)
        return res.status(400).json({ msg: "This Email is already in use" });
    }

    if (phone) {
      const phoneDuplicate = User.findOne({ phone });
      if (phoneDuplicate)
        return res.status(400).json({ msg: "This Phone is already in use" });
    }

    const updateData = { fullName, email, phone };

    if (avator) updateData.avator = avator;

    const user = await User.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

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
