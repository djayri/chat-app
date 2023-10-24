class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnknownError";
  }
}

class UserExistError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserExistError";
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

class RoomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "RoomNotFound";
  }
}

class DuplicateUserInRoomError extends Error {
  constructor(message) {
    super(message);
    this.name = "RoomNotFound";
  }
}

const APP_STATUS = {
  SERVER_ERROR: 1000,
  USER_EXIST_ERROR: 2000,
  USER_NOT_FOUND_ERROR: 2001,
  ROOM_NOT_FOUND_ERROR: 3000,
  ROOM_DUPLICATE_USER_ERROR: 30001,
};

const errorHandler = (req, res, error) => {
  console.error({ error: error.message });
  let message = error.message || "unknown message";
  let status = 500;
  let appStatus = APP_STATUS.SERVER_ERROR;

  if (error instanceof UnknownError) {
    (status = 500), (appStatus = APP_STATUS.SERVER_ERRORP);
  } else if (error instanceof UserExistError) {
    (status = 400), (appStatus = APP_STATUS.USER_EXIST_ERROR);
    message = "Failed to create a user, user is exist";
  } else if (error instanceof UserNotFoundError) {
    (status = 404), (appStatus = APP_STATUS.USER_NOT_FOUND_ERROR);
    message = "No user found";
  } else if (error instanceof RoomNotFoundError) {
    (status = 404), (appStatus = APP_STATUS.ROOM_NOT_FOUND_ERROR);
    message = "no room found";
  } else if (error instanceof DuplicateUserInRoomError) {
    (status = 400), (appStatus = APP_STATUS.ROOM_DUPLICATE_USER_ERROR);
    message = "user is taken in this room";
  }
  return res.status(status).send({ message, appStatus });
};

module.exports = {
  errorHandler,
  UnknownError,
  UserExistError,
  UserNotFoundError,
  RoomNotFoundError,
  DuplicateUserInRoomError,
};
