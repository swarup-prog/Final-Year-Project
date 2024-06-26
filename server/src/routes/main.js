const authRoute = require("./auth.routes.js");
const userRoute = require("./user.routes.js");
const gameRoute = require("./game.routes.js");
const emailRoute = require("./emailVerification.routes.js");
const chatRoute = require("./chat.routes.js");
const messageRoute = require("./message.routes.js");
const notificationRoute = require("./notification.routes.js");
const liveRoute = require("./live.routes.js");
const reportRoute = require("./report.routes.js");
const newsRoute = require("./news.routes.js");
const { protect } = require("../middlewares/auth.middleware.js");

const router = require("express").Router();

router.use("/api/auth", authRoute);
router.use("/api/user", protect, userRoute);
router.use("/api/game", protect, gameRoute);
router.use("/api/email", protect, emailRoute);
router.use("/api/chat", protect, chatRoute);
router.use("/api/message", protect, messageRoute);
router.use("/api/notifications", protect, notificationRoute);
router.use("/api/live", protect, liveRoute);
router.use("/api/report", protect, reportRoute);
router.use("/api/news", protect, newsRoute);

module.exports = router;
