const dotenv = require("dotenv");
const express = require("express");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
const roomRoutes = require("./routes/room");
const connectDB = require("./db");

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/messages", messageRoutes);
app.use("/user", userRoutes);
app.use("/room", roomRoutes);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Chat App server running on port:${PORT}`);
});
