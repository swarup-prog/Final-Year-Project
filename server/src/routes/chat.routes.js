const {
  accessChat,
  fetchChats,
  createGroupChat,
} = require("../controllers/chat.controller");

const router = require("express").Router();

router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group-chat").post(createGroupChat);

module.exports = router;
