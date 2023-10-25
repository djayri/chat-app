const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    code: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", model);

module.exports = Room;
