const router = require("express").Router();

const {
  getUserInfo,
  updateInterestedGames,
} = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);
router.route("/updateInterestedgame").patch(updateInterestedGames);

module.exports = router;
