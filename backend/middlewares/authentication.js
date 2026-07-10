const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookievalue = req.cookies[cookieName];
    if (!tokenCookievalue)
      return res.status(404).json({ msg: "User must be Login" });

    try {
      const userPayload = validateToken(tokenCookievalue);
      return res.status(200).json(userPayload);
    } catch (error) {
      console.log("Error in JWT Verification", error);
      return res
        .clearCookie("token")
        .status(401)
        .json({ msg: "Please Login Again" });
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
