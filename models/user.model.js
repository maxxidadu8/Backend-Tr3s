const mongoose = require('mongoose'); // Importa mongoose para trabajar con MongoDB

// Define el esquema para la colección de usuarios (users)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del usuario, requerido
  email: { type: String, required: true, unique: true }, // Correo electrónico del usuario, requerido y debe ser único
  password: { type: String, required: true }, // Contraseña del usuario, requerida
  age: { type: Number, required: true }, // Edad del usuario, requerida
  createdAt: { type: Date, default: Date.now } // Fecha de creación, por defecto es la fecha actual
});

// Crea el modelo de User basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
