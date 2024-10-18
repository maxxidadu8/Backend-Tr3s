const request = require('supertest');
const app = require('../app'); // Asegúrate de importar tu aplicación aquí

describe('Adoption Routes', () => {
  let adoptionId; // Variable para almacenar el ID de la adopción creada

  // Prueba para crear una nueva adopción
  beforeAll(async () => {
    const newAdoption = {
      petName: "Rex", 
      adopterName: "Juan"
    };
    
    const res = await request(app)
      .post('/api/adoptions')
      .send(newAdoption);

    adoptionId = res.body.id; // Guardar el ID de la adopción creada
  });

  // Prueba para obtener todas las adopciones
  it('GET /api/adoptions - debe obtener todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Prueba para crear una nueva adopción
  it('POST /api/adoptions - debe crear una nueva adopción', async () => {
    const newAdoption = {
      petName: "Rex",
      adopterName: "Juan"
    };
    
    const res = await request(app)
      .post('/api/adoptions')
      .send(newAdoption);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Adopción creada');
    expect(res.body.petName).toBe(newAdoption.petName);
    expect(res.body.adopterName).toBe(newAdoption.adopterName);
  });

  // Prueba para eliminar una adopción existente
  it('DELETE /api/adoptions/:id - debe eliminar una adopción existente', async () => {
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);
    
    expect(res.statusCode).toBe(204);
  });
});
