const router = require("express").Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/message.controller.js");

router.route("/").post(sendMessage);
router.route("/:chatId").get(getMessages);

module.exports = router;
