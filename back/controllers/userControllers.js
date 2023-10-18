const User = require("../models/user");
const Profesion = require("../models/job");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { nombre, password, domicilio } = req.body;

  // Validar que no exista un usuario con el mismo nombre
  if (await User.findOne({ nombre })) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const user = new User({ nombre, password, domicilio });
  await user.save();
  console.log("user creado:", user);
  return res.status(201).json({ message: "Usuario creado" });
};

exports.login = async (req, res) => {
  const { nombre, password } = req.body;

  // Validar que el usuario exista
  const user = await User.findOne({ nombre });
  if (!user) {
    return res.status(400).json({ message: "El usuario no existe" });
  }

  // Validar que la contraseña sea correcta
  if (user.password !== password) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  // Generar token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({ message: "Login exitoso", token });
};

exports.verifyToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // Add user from payload
    req.user = decoded;
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

exports.addJob = async (req, res, next) => {
  const { nombre, titulo, descripcion } = req.body;
  try {
    // Validar que el usuario exista
    const user = await User.findOne({ nombre });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    if (descripcion.length > 300) {
      return res.status(400).json({ message: "La descripcion es muy larga" });
    }
    if (titulo.length > 20) {
      return res.status(400).json({ message: "El titulo es muy largo" });
    }
    // Crear profesion
    const profesion = new Profesion({ titulo, descripcion });
    await profesion.save();

    // Agregar profesion al usuario
    user.profesiones.push(profesion);
    await user.save();

    return res.status(201).json({ message: "Profesion agregada" });
  } catch (error) {
    next(error);
  }
};

exports.getJobs = async (req, res, next) => {
  const { nombre } = req.params;
  try {
    // Validar que el usuario exista
    const user = await User.findOne({ nombre });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    // Obtener profesiones del usuario
    const profesiones = await Profesion.find({
      _id: { $in: user.profesiones },
    });

    return res.status(200).json({ profesiones });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const { nombre, id } = req.params;
    const user = await User.findOne({ nombre });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await Profesion.findByIdAndRemove(id);

    // También elimina la referencia del trabajo en el array de profesiones del usuario
    user.profesiones = user.profesiones.filter(
      (profesionId) => profesionId.toString() !== id
    );

    await user.save();
    const profesiones = await Profesion.find({
      _id: { $in: user.profesiones },
    });
    return res.status(200).json({ profesiones, message: "Trabajo eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al eliminar el trabajo" });
  }
};

exports.editJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const job = await Profesion.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    job.titulo = titulo;
    job.descripcion = descripcion;

    await job.save();

    return res.status(200).json({ job, message: "Trabajo actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al actualizar el trabajo" });
  }
};
