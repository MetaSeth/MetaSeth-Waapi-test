import request from 'supertest';
import app from '../app';
describe('Actions API', () => {
  test('POST /actions/add should add an action', async () => {
    const response = await request(app).post('/actions/add').send({ type: 'A' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Action added successfully.');
  });

  test('GET /actions/status should return current status', async () => {
    const response = await request(app).get('/actions/status');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('queue');
    expect(response.body).toHaveProperty('credits');
  });
});
