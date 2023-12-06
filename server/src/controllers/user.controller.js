const { User } = require("../models/user/User");

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId, { password: 0, __v: 0 });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUserInfo };
