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
      const { roomCode, content, sender } = message;
      console.log({ roomCode, content, sender });
      // const roomData = getRoom(roomCode);
      // if (!roomData || !roomData.users || !roomData.users.length) return;
      // // roomData.users.forEach((user) => {})
      // console.log({ roomData });
      socket.to(roomCode).emit("message_received", message);
      console.log("message_received sent");
    });
  });
};

module.exports = { initSocket };
