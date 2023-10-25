const socketIO = require("socket.io");
const { getRoom } = require("./controller/room");

const initSocket = (server) => {
  const io = socketIO(server, {
    pingTimeout: 10000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_room", ({ roomCode, userName }) => {
      socket.join(roomCode);
      console.log(`user ${userName} join room ${roomCode}`);
      socket.emit("room_connected", roomCode);
    });

    socket.on("new_message", (message) => {
      console.log("new message received", message);
      socket.to(message.roomCode).emit("message_received", message);
    });
  });
};

module.exports = { initSocket };
