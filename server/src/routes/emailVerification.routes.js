const sendEmail = require("../controllers/emailVerification.controller.js");
const router = require("express").Router();

router.route("/verify").post(sendEmail);

module.exports = router;
