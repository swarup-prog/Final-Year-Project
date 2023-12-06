const router = require("express").Router();

const { getUserInfo } = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);

module.exports = router;
