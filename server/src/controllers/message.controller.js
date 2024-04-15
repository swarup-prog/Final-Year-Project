const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { User } = require("../models/User");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passeed into request");
    return res.status(400).json({ msg: "Invalid data" });
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name profileImg");

    message = await message.populate("chat");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profileImg",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    console.log("Error in sending message", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name profileImg username")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.log("Error in getting messages", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
