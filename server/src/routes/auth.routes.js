const router = require("express").Router();
const passport = require("passport");
const {
  register,
  login,
  googleLogin,
} = require("../controllers/auth.controller.js");

// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleLogin
);

module.exports = router;
