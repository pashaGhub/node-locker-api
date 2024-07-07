import server from '../../index';
import request from 'supertest';

describe('POST /register', () => {
  afterAll(async () => {
    server.close();
  });
  const user = { username: 'user', password: 'password' };
  it('should return json with status 200 if username and password passed', async () => {
    const response = await request(server)
      .post('/api/register')
      .send({ username: user.username, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User created successfully' });
  });

  it('should return json with status 409 if user already exists', async () => {
    const response = await request(server)
      .post('/api/register')
      .send({ username: user.username, password: user.password });
    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  it('should return json with status 400 if username is missing', async () => {
    const response = await request(server)
      .post('/api/register')
      .send({ password: user.password });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        'Username is required. Please check if it is string and provided.',
    });
  });

  it('should return json with status 400 if password is missing', async () => {
    const response = await request(server)
      .post('/api/register')
      .send({ username: user.username });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        'Password is required. Please check if it is string and provided.',
    });
  });
});

describe('POST /login', () => {
  afterAll(async () => {
    server.close();
  });
  const user = { username: 'user', password: 'password' };
  it('should return json with status 200 if username and password passed', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ username: user.username, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return json with status 401 if user does not exist', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ username: 'notExistingUser', password: user.password });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'username or password is incorrect',
    });
  });

  it('should return json with status 401 if password is incorrect', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ username: user.username, password: 'incorrectPassword' });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: 'username or password is incorrect',
    });
  });

  it('should return json with status 400 if username is missing', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ password: user.password });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'username and password are required',
    });
  });

  it('should return json with status 400 if password is missing', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ username: user.username });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'username and password are required',
    });
  });
});
