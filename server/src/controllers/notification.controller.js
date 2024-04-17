const { Notification } = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id });
    // order by newest notification
    notifications.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

const markAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id }, { read: true });
    res.status(200).json({ message: "Marked all as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotifications, markAsRead };
