const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookievalue = req.cookies[cookieName];
    if (!tokenCookievalue) return res.status(404).json({ msg: "User must be Login" });

    try {
      const userPayload = validateToken(tokenCookievalue);
      req.user = userPayload;
    } catch (error) {
      return res.status(404).json({ msg: "Please Login Again" });
      console.log(error);
    }

    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
