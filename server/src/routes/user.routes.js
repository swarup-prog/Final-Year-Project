const router = require("express").Router();

const {
  getUserInfo,
  updateInterestedGames,
  getAllUsers,
  sendBuddyRequest,
} = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);
router.route("/getAllUsers").get(getAllUsers);
router.route("/updateInterestedgame").patch(updateInterestedGames);
router.route("/updateInterestedgame").patch(updateInterestedGames);
router.route("/sendBuddyRequest").patch(sendBuddyRequest);

module.exports = router;
