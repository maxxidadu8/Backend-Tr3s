const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); 

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del usuario.
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario.
 */
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({ name, email });
  
  try {
    await newUser.save(); // Guardar el nuevo usuario en la base de datos
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear usuario' });
  }
});

module.exports = router;
