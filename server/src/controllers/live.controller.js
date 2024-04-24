const Live = require("../models/Live");
const { User } = require("../models/User");
const { Notification } = require("../models/Notification");

const goLive = async (req, res) => {
  const { title, platform, url } = req.body;
  const user = req.user._id;

  try {
    const live = new Live({ user, title, platform, url });
    // send notification to all the friends of the user
    const currentUser = await User.findById(user);
    currentUser.buddies.forEach(async (buddy) => {
      const notification = new Notification({
        receiver: buddy,
        category: "live",
        sender: user,
        message: `${currentUser.name} is live now on ${platform}.`,
      });
      await notification.save();
    });
    await live.save();
    res.status(201).json(live);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server error." });
  }
};

const getLiveBuddies = async (req, res) => {
  try {
    // Retrieve the user from the database
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Find all the live streams of the user's buddies
    const live = await Live.find({ user: { $in: user.buddies } }).populate(
      "user"
    );

    const userLive = await Live.find({ user: req.user._id }).populate("user");
    if (userLive) live.push(userLive[0]);
    res.status(200).json(live);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const endLive = async (req, res) => {
  try {
    const live = await Live.find({ user: req.user._id });
    if (!live)
      return res.status(404).json({ message: "Live stream not found" });

    await Live.findByIdAndDelete(live[0]._id);

    res.status(200).send({ message: "Live stream ended." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { goLive, getLiveBuddies, endLive };
