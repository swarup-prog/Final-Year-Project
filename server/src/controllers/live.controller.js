const Live = require("../models/Live");

const goLive = async (req, res) => {
  const { title, platform, url } = req.body;
  const user = req.user._id;

  try {
    const live = new Live({ user, title, platform, url });
    await live.save();
    res.status(201).json(live);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLiveBuddies = async (req, res) => {
  const user = req.user._id;

  try {
    // Find all the live streams of the user's buddies
    const live = await Live.find({ user: { $in: user.buddies } });
    res.status(200).json(live);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const endLive = async (req, res) => {
  const { id } = req.params;
  try {
    const live = await Live.findByIdAndDelete(id);
    res.status(200).json(live);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { goLive, getLiveBuddies, endLive };
