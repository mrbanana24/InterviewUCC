const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  password: String,
  domicilio: {
    calle: String,
    ciudad: String,
    estado: String,
  },
  profesiones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profesion" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
