const express = require("express");
const { joinRoom, createRoom, getAllRoom } = require("../controller/room");
const { errorHandler, UserNotFoundError } = require("../utils/errors");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const rooms = await getAllRoom();
      res.status(200).send(rooms);
    } catch (error) {
      errorHandler(req, res, error);
    }
  })
  .post(async (req, res) => {
    const { code } = req.body;
    try {
      const newRoom = await createRoom(code);
      res.status(201).send(newRoom);
    } catch (error) {
      errorHandler(req, res, error);
    }
  });

router.route("/:roomCode").put(async (req, res) => {
  const { userId } = req.body;
  const { roomCode } = req.params;
  try {
    const room = await joinRoom(roomCode, userId);
    res.status(200).send(room);
  } catch (error) {
    errorHandler(req, res, error);
  }
});

module.exports = router;
