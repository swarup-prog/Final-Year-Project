const router = require("express").Router();

const {
  getUserInfo,
  updateInterestedGames,
  getAllUsers,
  sendBuddyRequest,
  getTotalUsers,
  acceptBuddyRequest,
  cancelBuddyRequest,
} = require("../controllers/user.controller");

router.route("/getUserInfo/:id").get(getUserInfo);
router.route("/getAllUsers").get(getAllUsers);
router.route("/getTotalUsers").get(getTotalUsers);
router.route("/updateInterestedgame").patch(updateInterestedGames);
router.route("/updateInterestedgame").patch(updateInterestedGames);
router.route("/sendBuddyRequest").patch(sendBuddyRequest);
router.route("/acceptBuddyRequest").patch(acceptBuddyRequest);
router.route("/cancelBuddyRequest").patch(cancelBuddyRequest);

module.exports = router;
