const router = require("express").Router();
const passport = require("passport");
const {
  register,
  login,
  logout,
  googleOAuthFail,
  googleOAuthSuccess,
} = require("../controllers/auth.controller.js");

// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

router.get("/login/success", googleOAuthSuccess);
router.get("/login/failed", googleOAuthFail);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
