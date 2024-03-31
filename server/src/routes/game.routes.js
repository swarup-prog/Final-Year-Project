const router = require("express").Router();
const { addGame, getGames } = require("../controllers/game.controller");

router.route("/add").post(addGame);
router.route("/getAll").get(getGames);

module.exports = router;
