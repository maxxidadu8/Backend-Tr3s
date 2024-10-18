const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Usuarios',
        version: '1.0.0',
        description: 'Documentación de la API para la gestión de usuarios',
      },
      servers: [
        {
          url: 'http://localhost:3000', // Cambia esto si tu servidor corre en otro puerto
        },
      ],
    },
    apis: ['./routes/*.js'], // Ruta donde se encuentran las definiciones de Swagger
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
