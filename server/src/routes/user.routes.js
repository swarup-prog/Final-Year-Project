const router = require("express").Router();

const { getUserInfo } = require("../controllers/user.controller");

router.route("/getUserInfo", getUserInfo);

module.exports = router;
