const express = require("express");
const { registerUser, getUser } = require("../controller/user");
const { errorHandler, UserNotFoundError } = require("../utils/errors");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = await getUser(req.query);
      if (!user) throw new UserNotFoundError();
      res.status(200).send(user);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).send(message);
    }
  })
  .post(async (req, res) => {
    const { name } = req.body;
    try {
      const newUser = await registerUser(name);
      res.status(201).send(newUser);
    } catch (error) {
      const { status, message } = errorHandler(error);
      res.status(status).send(message);
    }
  });

// router.route('/:name').get(async(req, res => {

// })

module.exports = router;
