const mongoose = require('mongoose'); // Importa mongoose para trabajar con MongoDB

// Define el esquema para la colección de mascotas (pets)
const petSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre de la mascota, requerido
  breed: { type: String, required: true }, // Raza de la mascota, requerida
  age: { type: Number, required: true }, // Edad de la mascota, requerida
  owner: { type: String, required: true }, // Nombre del propietario, requerido
  createdAt: { type: Date, default: Date.now } // Fecha de creación, por defecto es la fecha actual
});

// Crea el modelo de Pet basado en el esquema definido
const Pet = mongoose.model('Pet', petSchema);

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Pet;
