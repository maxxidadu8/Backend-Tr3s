// utils/mocking.js
const faker = require('faker'); // Importa faker para generar datos aleatorios
const bcrypt = require('bcrypt'); // Importa bcrypt para el hashing de contraseñas

// Función para generar un array de usuarios
const generateUsers = (numUsers) => {
  const users = []; // Arreglo para almacenar los usuarios generados
  const saltRounds = 10; // Número de rondas para el hashing
  const hashedPassword = bcrypt.hashSync('coder123', saltRounds); // Hashea una contraseña predeterminada

  // Generar usuarios aleatorios
  for (let i = 0; i < numUsers; i++) {
    users.push({
      name: faker.person.findName(), // Genera un nombre aleatorio
      email: faker.internet.email(), // Genera un correo electrónico aleatorio
      password: hashedPassword, // Asigna la contraseña hasheada
      role: faker.random.arrayElement(['user', 'admin']), // Asigna un rol aleatorio ('user' o 'admin')
      pets: [], // Inicializa un array vacío para las mascotas
    });
  }
  return users; // Retorna el array de usuarios generados
};

module.exports = { generateUsers }; // Exporta la función para su uso en otras partes de la aplicación
