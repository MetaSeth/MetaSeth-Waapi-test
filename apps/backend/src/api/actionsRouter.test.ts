import request from 'supertest';
import { app, scheduler } from '../main';
describe('Actions API', () => {
  afterEach(() => {
    scheduler.clearIntervals();
  });
  afterAll((done) => {
    const server = app.get('server');
    server.close(done);
  });
  test('Get /actions/types should return list of actions types', async () => {
    const response = await request(app).get('/actions/types');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: expect.any(String),
        }),
      ])
    );
  });

  test('GET /actions/status should return current status', async () => {
    const response = await request(app).get('/actions/status');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('queue');
    expect(response.body).toHaveProperty('credits');
  });
});
