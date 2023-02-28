import request from 'supertest';

import app from '../app';

describe('app', () => {
  test('root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
