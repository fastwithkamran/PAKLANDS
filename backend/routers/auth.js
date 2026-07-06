const { Router } = require("express");
const router = Router();

const handleUserLogin = require ("../controllers/login.js")
const handleUserSignUp = require ("../controllers/signup.js")

router.get("/login", (req, res) => {
  return res.redirect("/user/login");
});
router.get("/signup", (req, res) => {
  return res.redirect("/user/signup");
});

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;