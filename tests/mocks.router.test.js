const request = require('supertest');
const app = require('../app'); 
const User = require('../models/user.model');
const Pet = require('../models/pet.model');
const mongoose = require('mongoose'); // Importa mongoose

describe('Mock API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Pet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close(); // Cierra la conexión a la base de datos
  });

  describe('POST /api/mocks/generateData', () => {
    it('debería generar y guardar datos de usuarios y mascotas', async () => {
      const response = await request(app)
        .post('/api/mocks/generateData')
        .send({ users: 5, pets: 5 });
      
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Datos generados e insertados exitosamente');
      expect(response.body.users).toBe(5);
      expect(response.body.pets).toBe(5);
    });

    it('debería retornar un error si no se proporciona número de usuarios o mascotas', async () => {
      const response = await request(app)
        .post('/api/mocks/generateData')
        .send({});
      
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe("Por favor, proporciona los números de 'users' y 'pets'");
    });
  });

  describe('GET /api/mocks/users', () => {
    it('debería obtener todos los usuarios', async () => {
      await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password', age: 30 });
      
      const response = await request(app).get('/api/mocks/users');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('John Doe');
    });
  });

  describe('GET /api/mocks/pets', () => {
    it('debería obtener todas las mascotas', async () => {
      await Pet.create({ name: 'Rex', breed: 'Labrador', age: 3, owner: 'John Doe' });
      
      const response = await request(app).get('/api/mocks/pets');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Rex');
    });
  });

  describe('DELETE /api/mocks/users', () => {
    it('debería eliminar todos los usuarios', async () => {
      await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password', age: 30 });
      
      const response = await request(app).delete('/api/mocks/users');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Todos los usuarios han sido eliminados.");
    });
  });

  describe('DELETE /api/mocks/pets', () => {
    it('debería eliminar todas las mascotas', async () => {
      await Pet.create({ name: 'Rex', breed: 'Labrador', age: 3, owner: 'John Doe' });
      
      const response = await request(app).delete('/api/mocks/pets');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Todas las mascotas han sido eliminadas.");
    });
  });
});
