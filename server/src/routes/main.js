const authRoute = require("./auth.routes.js");
const userRoute = require("./user.routes.js");
const gameRoute = require("./game.routes.js");
const emailRoute = require("./emailVerification.routes.js");

const router = require("express").Router();

router.use("/api/auth", authRoute);
router.use("/api/user", userRoute);
router.use("/api/game", gameRoute);
router.use("/api/email", emailRoute);

module.exports = router;
