const mongoose = require("mongoose");
const Profesion = require("./job");

const userSchema = new mongoose.Schema({
  nombre: String,
  password: String,
  domicilio: {
    calle: String,
    numero: Number,
    ciudad: String,
  },
  // Relacion uno a muchos, un user puede tener muchas profesiones.
  profesiones: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Profesion", required: false },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
