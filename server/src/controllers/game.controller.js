const { Game } = require("../models/Game.js");
const { cloudinaryUpload } = require("../services/cloudinary.js");

const addGame = async (req, res) => {
  const body = { ...req.body };
  const image = req.files.image;

  try {
    const game = await Game.findOne({ name: body.name });
    if (game) {
      return res.status(409).json({ message: "Game already exists" });
    }

    const imageUrl = await cloudinaryUpload(image);
    await new Game({ ...body, image: imageUrl }).save();
    res.status(201).send({ message: "Game added successfully." });
  } catch (error) {
    console.log("Error in while adding game", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

const getGames = async (req, res) => {
  try {
    const games = await Game.find();

    if (!games) {
      res.status(404).send({ message: "No games available." });
    }

    return res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = { addGame, getGames };
