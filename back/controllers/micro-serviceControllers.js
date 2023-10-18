const User = require("../models/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
