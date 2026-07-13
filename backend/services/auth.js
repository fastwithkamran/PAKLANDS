require("dotenv").config();
const JWT = require("jsonwebtoken");

const secret = process.env.SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    name: user.fullName,
  };
  const token = JWT.sign(payload, secret, { expiresIn: "90d" });
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);

  if (!payload) return res.status(400).json({ msg: "Invalid Auth Token" });
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
