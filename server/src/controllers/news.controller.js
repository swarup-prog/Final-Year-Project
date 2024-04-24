const { Game } = require("../models/Game");
const { News } = require("../models/News");
const { Notification } = require("../models/Notification");
const { User } = require("../models/User");

const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).send(news);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const postNews = async (req, res) => {
  try {
    const { title, game, content } = req.body;

    if (!title || !game || !content) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const news = new News({
      title,
      game,
      content,
    });
    await news.save();

    const gameDetails = await Game.findById(game);

    const users = await User.find({ favoriteGames: gameDetails._id });

    users.forEach(async (user) => {
      const notification = new Notification({
        receiver: user._id,
        sender: gameDetails._id,
        title: "New News",
        Message: `${title}`,
        type: "news",
      });
      await notification.save();
    });

    res.status(200).send({ message: "News published!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { getNews, postNews };
