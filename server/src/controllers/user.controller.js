const { Notification } = require("../models/Notification");
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

    // filter out the user requesting the data
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== req.user._id.toString()
    );

    return res.status(200).json(filteredUsers);
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
      receiver: addedUser._id,
      category: "buddyRequest",
      sender: user._id,
      message: `${user.username} sent you a buddy request`,
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
    if (!req.user || !req.user._id || !req.body.addedUserId) {
      console.log("Invalid request: User ID or Added User ID missing");
      return res
        .status(400)
        .send({ message: "Invalid request: Missing user information" });
    }

    const user = await User.findById(req.user._id);
    const addedUser = await User.findById(req.body.addedUserId);

    if (!user || !addedUser) {
      console.log("User not found");
      return res.status(404).send({ message: "User not found" });
    }

    user.pendingRequest = user.pendingRequest.filter(
      (userId) => !userId.equals(addedUser._id)
    );
    addedUser.buddyRequest = addedUser.buddyRequest.filter(
      (userId) => !userId.equals(user._id)
    );

    await user.save();
    await addedUser.save();

    res.status(200).send({ message: "Buddy request cancelled!" });
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
  cancelBuddyRequest,
};
