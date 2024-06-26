const { Notification } = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.user._id })
      .populate("sender")
      .populate("receiver");
    // order by newest notification
    notifications.sort((a, b) => b.createdAt - a.createdAt);

    const unreadCount = await Notification.countDocuments({
      receiver: req.user._id,
      read: false,
    });
    res.status(200).json({ notifications, unreadCount: unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ receiver: req.user._id }, { read: true });
    res.status(200).json({ message: "Marked all as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotifications, markAsRead };
