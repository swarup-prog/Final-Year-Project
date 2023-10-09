const router = require("express").Router();
const {
  register,
  login,
  logout,
} = require("../controllers/auth.controller.js");

// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

// Logout route
router.route("/logout").post(logout);

module.exports = router;
