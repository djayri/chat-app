const Room = require("../models/room");
const {
  RoomNotFoundError,
  DuplicateUserInRoomError,
} = require("../utils/errors");

const getAllRoom = async () => {
  const rooms = await Room.find();
  return rooms;
};
const joinRoom = async (code, userId) => {
  if (!userId) throw new Error("user ID is required");

  const existingRoom = await getRoom(code);
  if (!existingRoom) throw new RoomNotFoundError();

  if (existingRoom && existingRoom.users.includes(userId))
    throw new DuplicateUserInRoomError();

  const pushedUser = Room.findByIdAndUpdate(
    existingRoom._id,
    { $push: { users: userId } },
    { new: true }
  );

  return pushedUser;
};

const createRoom = async (code, users) => {
  const existingRoom = await getRoom(code);
  if (existingRoom) return existingRoom;

  console.log({ users });

  const newRoom = await Room.create({ code, users });
  return newRoom;
};

const getRoom = async (code) => {
  const room = await Room.findOne({ code });
  return room;
};

module.exports = { joinRoom, createRoom, getAllRoom, getRoom };
