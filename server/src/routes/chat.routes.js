const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
} = require("../controllers/chat.controller");

const router = require("express").Router();

router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group-chat").post(createGroupChat);
router.route("/rename-group").put(renameGroup);

module.exports = router;
