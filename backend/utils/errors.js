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

const errorHandler = (error) => {
  console.error({ error: error.message });
  let message = error.message || "unknown message";
  let status = 500;
  if (error instanceof UnknownError) {
    status = 500;
  } else if (error instanceof UserExistError) {
    status = 400;
    message = "Failed to create a user, user is exist";
  } else if (error instanceof UserNotFoundError) {
    status = 404;
    message = "No user found";
  } else if (error instanceof RoomNotFoundError) {
    status = 404;
    message = "no room found";
  } else if (error instanceof DuplicateUserInRoomError) {
    status = 400;
    message = "user is taken in this room";
  }
  return { status, message };
};

module.exports = {
  errorHandler,
  UnknownError,
  UserExistError,
  UserNotFoundError,
  RoomNotFoundError,
  DuplicateUserInRoomError,
};
