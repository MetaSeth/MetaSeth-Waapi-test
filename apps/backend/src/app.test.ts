import request from 'supertest';
import app from './app';  

describe('API Integration Tests', () => {
  // Test the GET /actions/status endpoint for functional response
  it('should respond correctly to the /actions/status endpoint', async () => {
    const response = await request(app).get('/actions/status');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('queue');
    expect(response.body).toHaveProperty('credits');
  });

  // Test the POST /actions/add endpoint for functional behavior
  it('should allow adding an action and return appropriate response', async () => {
    const addActionResponse = await request(app)
      .post('/actions/add')
      .send({ type: 'A' });
    expect(addActionResponse.statusCode).toBe(200);
    expect(addActionResponse.text).toContain('Action added successfully');

    const statusResponse = await request(app).get('/actions/status');
    expect(statusResponse.body.queue).toContain('A');  // Check if the queue includes the added action
  });
});
