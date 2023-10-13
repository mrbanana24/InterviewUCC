const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, password, domicilio, profesiones } = req.body;

  try {
    // Check if user already exists
    if (await User.findOne({ nombre })) {
      return res.status(400).json({
        error: true,
        message: "El nombre de usuario ya está registrado",
      });
    }

    // Create user
    const user = new User({
      nombre,
      password,
      domicilio,
      profesiones,
    });

    // Save user
    const userDB = await user.save();
    res.json({
      error: null,
      data: userDB,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
