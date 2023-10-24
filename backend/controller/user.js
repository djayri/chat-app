const User = require("../models/user");
const { UserExistError, UserNotFoundError } = require("../utils/errors");
const getUser = async (query) => {
  if (query && query.name) return await getUserByName(query.name);

  const allUsers = await User.find();
  return allUsers;
};

const getUserByName = async (name) => {
  const user = await User.findOne({ name });
  return user;
};

const registerUser = async (name) => {
  const existingUser = await getUserByName(name);
  if (existingUser) throw new UserExistError();

  const newUser = await User.create({ name });
  return newUser;
};

module.exports = { getUser, registerUser };
