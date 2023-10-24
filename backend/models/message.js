const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    room: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    content: { type: String, trim: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", model);

module.exports = Message;
