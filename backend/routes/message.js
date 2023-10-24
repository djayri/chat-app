const express = require("express");
const { getAllMessages, createMessage } = require("../controller/message");
const { errorHandler } = require("../utils/errors");

const router = express.Router();

router
  .route("/:roomId")
  .get(async (req, res) => {
    try {
      const { roomId } = req.params;
      const result = await getAllMessages(roomId);
      res.status(200).send(result);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).send(message);
    }
  })
  .post(async (req, res) => {
    const { roomId } = req.params;
    const { userId, content } = req.body;
    try {
      const newMessage = await createMessage(roomId, userId, content);
      res.status(201).send(newMessage);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).send(message);
    }
  });

module.exports = router;
