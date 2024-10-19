const express = require('express');
const router = express.Router();

// Simulando una base de datos en memoria
let adoptions = [];

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Obtiene todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la adopción.
 *                   petName:
 *                     type: string
 *                     description: Nombre de la mascota adoptada.
 */
router.get('/', (req, res) => {
  res.json(adoptions); // Devuelve la lista de adopciones
});

/**
 * @swagger
 * /adoptions:
 *   post:
 *     summary: Crea una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petName:
 *                 type: string
 *                 description: Nombre de la mascota adoptada
 *               adopterName:
 *                 type: string
 *                 description: Nombre del adoptante
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/', (req, res) => {
  const { petName, adopterName } = req.body;
  const newAdoption = {
    id: (adoptions.length + 1).toString(), // Asigna un nuevo ID
    petName,
    adopterName
  };
  adoptions.push(newAdoption); // Agrega la nueva adopción a la lista
  res.status(201).json({ message: "Adopción creada", ...newAdoption }); // Devuelve la adopción creada
});

/**
 * @swagger
 * /adoptions/{id}:
 *   delete:
 *     summary: Elimina una adopción existente
 *     tags: [Adoptions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la adopción a eliminar
 *     responses:
 *       204:
 *         description: Adopción eliminada exitosamente.
 *       404:
 *         description: Adopción no encontrada.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = adoptions.findIndex(adoption => adoption.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Adopción no encontrada" });
  }

  adoptions.splice(index, 1); // Elimina la adopción de la lista
  res.status(204).send(); // Responde con un estado 204
});

// Exporta el router
module.exports = router;
