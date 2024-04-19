const router = require("express").Router();
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notification.controller");

router.get("/", getNotifications);
router.patch("/mark-as-read", markAsRead);

module.exports = router;
