const router = require("express").Router();
const { addGame } = require("../controllers/game.controller");

router.route("/addGame").post(addGame);

module.exports = router;
