const express = require('express'); // Importa express para crear el enrutador
const { faker } = require('@faker-js/faker'); // Importa faker para generar datos aleatorios
const User = require('../models/user.model'); // Importa el modelo User
const Pet = require('../models/pet.model'); // Importa el modelo Pet

const mocksRouter = express.Router(); // Crea un nuevo enrutador

// Endpoint para generar y guardar datos de users y pets
mocksRouter.post('/generateData', async (req, res) => {
  try {
    const { users, pets } = req.body; // Obtiene el número de usuarios y mascotas a generar

    // Verifica si se proporcionaron los números de users y pets
    if (!users || !pets) {
      return res.status(400).json({ message: "Por favor, proporciona los números de 'users' y 'pets'" });
    }

    const generatedUsers = []; // Arreglo para almacenar usuarios generados
    const generatedPets = []; // Arreglo para almacenar mascotas generadas

    // Generar usuarios aleatorios
    for (let i = 0; i < users; i++) {
      generatedUsers.push({
        name: faker.person.fullName(), // Nombre aleatorio
        email: faker.internet.email(), // Correo electrónico aleatorio
        password: faker.internet.password(),  // Contraseña aleatoria
        age: faker.number.int({ min: 18, max: 80 }), // Edad aleatoria
        createdAt: new Date(), // Fecha de creación
      });
    }

    // Insertar usuarios generados en la base de datos
    await User.insertMany(generatedUsers);

    // Generar mascotas aleatorias
    for (let i = 0; i < pets; i++) {
      generatedPets.push({
        name: faker.animal.dog(), // Nombre de la mascota aleatorio
        breed: faker.animal.type(), // Raza aleatoria
        age: faker.number.int({ min: 1, max: 15 }), // Edad aleatoria
        owner: faker.person.fullName(), // Propietario aleatorio 
        createdAt: new Date(), // Fecha de creación
      });
    }

    // Insertar mascotas generadas en la base de datos
    await Pet.insertMany(generatedPets);

    // Respuesta exitosa con el número de usuarios y mascotas generados
    res.status(201).json({ message: "Datos generados e insertados exitosamente", users: generatedUsers.length, pets: generatedPets.length });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error al generar los datos", error: error.message });
  }
});

// Endpoint para obtener todos los usuarios
mocksRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Obtiene todos los usuarios de la base de datos
    res.status(200).json(users); // Responde con los usuarios encontrados
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
});

// Endpoint para obtener todas las mascotas
mocksRouter.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find(); // Obtiene todas las mascotas de la base de datos
    res.status(200).json(pets); // Responde con las mascotas encontradas
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error al obtener las mascotas", error: error.message });
  }
});

// Endpoint para eliminar todos los usuarios
mocksRouter.delete('/users', async (req, res) => {
  try {
    await User.deleteMany({}); // Elimina todos los usuarios de la base de datos
    res.status(200).json({ message: "Todos los usuarios han sido eliminados." }); // Respuesta exitosa
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error al eliminar los usuarios", error: error.message });
  }
});

// Endpoint para eliminar todas las mascotas
mocksRouter.delete('/pets', async (req, res) => {
  try {
    await Pet.deleteMany({}); // Elimina todas las mascotas de la base de datos
    res.status(200).json({ message: "Todas las mascotas han sido eliminadas." }); // Respuesta exitosa
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error al eliminar las mascotas", error: error.message });
  }
});

module.exports = mocksRouter; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
