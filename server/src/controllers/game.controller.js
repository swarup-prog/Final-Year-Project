const { Game } = require("../models/game/Game.js");

const addGame = async (req, res) => {
  let body = { ...req.body };

  try {
    const game = await Game.findOne({ name: body.name });
    if (game) {
      return res.status(409).json({ message: "Game already exists" });
    }
    await new Game({ ...body }).save();
    res.status(201).send({ message: "Game added successfully." });
  } catch (error) {
    console.log("Error in while adding game", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

module.exports = { addGame };
