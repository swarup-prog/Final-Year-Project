const router = require("express").Router();
const { report } = require("../controllers/report.controller.js");

router.route("/").post(report);

module.exports = router;
