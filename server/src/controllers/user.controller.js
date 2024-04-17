const { User } = require("../models/User");

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, { password: 0, __v: 0 })
      .populate("interestedGames")
      .populate("buddies", "-password")
      .populate("pendingRequest", "-password")
      .populate("buddyRequest", "-password");

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      { role: { $ne: "admin" } },
      { password: 0, __v: 0 }
    )
      .populate("interestedGames")
      .populate("buddies")
      .populate("pendingRequest")
      .populate("buddyRequest");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTotalUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    return res.status(200).json({ totalUsers: users.length });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateInterestedGames = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.interestedGames = req.body.interestedGames;

    await user.save();

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res
      .status(200)
      .send({ message: "Interested games updated successfully", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const sendBuddyRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const addedUser = await User.findById(req.body.addedUserId);

    if (!user || !addedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    user.pendingRequest = [...user.pendingRequest, addedUser._id];
    addedUser.buddyRequest = [...addedUser.buddyRequest, user._id];

    // create notification
    const notification = new Notification({
      user: addedUser._id,
      type: "buddyRequest",
      sender: user._id,
    });
    await notification.save();

    await user.save();
    await addedUser.save();

    res.status(200).send({ message: "Friend request sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const cancelBuddyRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const addedUser = await User.findById;

    if (!user || !addedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    user.pendingRequest = user.pendingRequest.filter(
      (userId) => userId.toString() !== addedUser._id.toString()
    );
    addedUser.buddyRequest = addedUser.buddyRequest.filter(
      (userId) => userId.toString() !== user._id.toString()
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUserInfo,
  updateInterestedGames,
  getAllUsers,
  sendBuddyRequest,
  getTotalUsers,
};
