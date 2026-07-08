const Comment = require("../models/comment");

const handleCreateComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const comment = await Comment.create({
      comment,
      createdBy: req.user._id,
      propertyId: req.params.propertyId,
    });

    return res.status(201).json({ msg: "Comment Created", data: comment });
  } catch (error) {
    return res.status(404).json({ msg: "Error Creating Comment" });
    console.log("Error Comment Creation", error);
  }
};

module.exports = handleCreateComment;
