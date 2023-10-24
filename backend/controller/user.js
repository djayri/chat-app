const User = require("../models/user");

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
  const filter = { name };
  const newUser = await User.findOneAndUpdate(
    filter,
    { name },
    { new: true, upsert: true }
  );
  return newUser;
};

module.exports = { getUser, registerUser };
