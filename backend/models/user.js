const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    name: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", model);

module.exports = User;
