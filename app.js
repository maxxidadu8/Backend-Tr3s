// app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Importar los routers
const mocksRouter = require('./routes/mocks.router');
const adoptionRouter = require('./routes/adoption.router'); // Importa el router de adopciones

// Middleware para parsear el body en JSON
app.use(express.json());

// Usar los routers bajo las rutas base
app.use('/api/mocks', mocksRouter);
app.use('/api/adoptions', adoptionRouter); // Usar el router de adopciones

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de mocks!');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

module.exports = app;
