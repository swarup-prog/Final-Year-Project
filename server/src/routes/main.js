const authRoute = require("./auth.routes.js");
const userRoute = require("./user.routes.js");
const gameRoute = require("./game.routes.js");
const emailRoute = require("./emailVerification.routes.js");
const chatRoute = require("./chat.routes.js");

const { protect } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();

router.use("/api/auth", authRoute);
router.use("/api/user", protect, userRoute);
router.use("/api/game", protect, gameRoute);
router.use("/api/email", protect, emailRoute);
router.use("/api/chat", protect, chatRoute);

module.exports = router;
