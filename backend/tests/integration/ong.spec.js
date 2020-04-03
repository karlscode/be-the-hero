const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connections');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'APADA SALVADOR',
        email: 'contato@apada.com.br',
        whatsapp: '7154685855',
        city: 'Salvador',
        uf: 'BA',
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
