const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, password, domicilio } = req.body;

  // Validar que no exista un usuario con el mismo nombre
  if (await User.findOne({ nombre })) {
    return res.status(400).json({ error: "El usuario ya existe" });
  }

  const user = new User({ nombre, password, domicilio });
  await user.save();
  console.log("user creado:", user);
  return res.status(201).json(user);
};
