const dotenv = require("dotenv");
const express = require("express");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const connectDB = require("./db");
const websocket = require("./websocket");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// CORS Setup
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/messages", messageRoutes);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Chat App server running on port:${PORT}`);
});

websocket.initSocket(server);
