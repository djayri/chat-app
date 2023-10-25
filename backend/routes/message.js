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
      errorHandler(req, res, error);
    }
  })
  .post(async (req, res) => {
    const { roomId } = req.params;
    const { sender, content } = req.body;
    try {
      const newMessage = await createMessage(roomId, sender, content);
      res.status(201).send(newMessage);
    } catch (error) {
      errorHandler(req, res, error);
    }
  });

module.exports = router;
