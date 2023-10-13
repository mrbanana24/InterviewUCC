const mongoose = require("mongoose");

const profesionSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
});

const Profesion = mongoose.model("Profesion", profesionSchema);

module.exports = Profesion;
