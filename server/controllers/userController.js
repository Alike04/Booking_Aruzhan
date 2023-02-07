const User = require("../models/User");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "User is not found");
  // }
  return user;
};
const createUser = async (userBody) => {
  // if (await User.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, "email has be already taken");
  // }
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  getUserByEmail,
  createUser,
};