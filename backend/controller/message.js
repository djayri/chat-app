const Message = require("../models/message");
const User = require("../models/user");
const { BadRequestError } = require("../utils/errors");
const getAllMessages = async (roomId) => {
  let messages = await Message.find({ room: roomId }).populate(
    "sender",
    "name"
  );

  return messages;
};

const createMessage = async (roomId, sender, content) => {
  if (!roomId || !sender || !content) throw new BadRequestError();

  let inserted = await Message.create({
    room: roomId,
    sender,
    content,
  });
  if (inserted) {
    inserted = await inserted.populate("sender", "name");
    return inserted;
  }

  throw new Error("failed to create new message");
};

module.exports = { getAllMessages, createMessage };
