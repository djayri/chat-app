const Message = require("../models/message");
const getAllMessages = async (roomId) => {
  const messages = await Message.find({ room: roomId });
  return messages;
};

const createMessage = async (roomId, userId, content) => {
  const inserted = await Message.create({
    room: roomId,
    sender: userId,
    content,
  });
  if (inserted) return inserted;
  throw new Error("failed to create new message");
};

module.exports = { getAllMessages, createMessage };
