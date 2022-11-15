const Admin = require("../models/astrologerSchema");
const Chat = require("../models/chat.model");

module.exports.createChat = async (req, res) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ message: "chat fetch successfully", chat });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json({ message: "chat fetch successfully", chat });
  } catch (error) {
    res.status(500).json(error);
  }
};
