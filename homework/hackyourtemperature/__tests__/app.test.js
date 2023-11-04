import { app } from '../app';

import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  it('No city name provided by the user', async () => {
    const response = await request.post('/weather').send({});
    expect(response.body).toEqual({ error: 'City name is required' });
    expect(response.statusCode).toBe(400);
  });
  it('City name entered by the user does not exist', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'Londonese' });
    expect(response.body).toEqual({ weatherText: 'City is not found!' });
    expect(response.statusCode).toBe(404);
  });
  it('City name entered by the user is correct and exists', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'London' });

    expect(response.body.weatherText).toContain('It is');
    expect(response.statusCode).toBe(200);
  });
});
