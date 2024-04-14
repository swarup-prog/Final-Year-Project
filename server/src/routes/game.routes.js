const router = require("express").Router();
const {
  addGame,
  getGames,
  getTotalGames,
} = require("../controllers/game.controller");

router.route("/add").post(addGame);
router.route("/getAll").get(getGames);
router.route("/getTotalGames").get(getTotalGames);

module.exports = router;
