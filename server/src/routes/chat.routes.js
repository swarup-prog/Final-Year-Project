const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat.controller");

const router = require("express").Router();

router.route("/").post(accessChat);
router.route("/").get(fetchChats);
router.route("/group-chat").post(createGroupChat);
router.route("/rename-group").put(renameGroup);
router.route("/add-user").put(addToGroup);
router.route("/remove-user").put(removeFromGroup);

module.exports = router;
