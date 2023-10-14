const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
