import server from '../../index';
import request from 'supertest';
import { IUser } from '../../types';

describe('POST /locker', () => {
  const item = { name: 'item' };

  // register user before running tests
  let token: string;
  beforeAll(async () => {
    await request(server)
      .post('/api/register')
      .send({ username: 'postLocker', password: 'password' });

    const response = await request(server)
      .post('/api/login')
      .send({ username: 'postLocker', password: 'password' });
    token = response.body.token;
  });

  afterAll(async () => {
    server.close();
  });

  it('should return json with status 200 if item is created', async () => {
    const response = await request(server)
      .post('/api/locker')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: item.name });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Item created successfully'
    );
    expect(response.body).toHaveProperty('lastID');
  });

  it('should return json with status 401 if token is missing', async () => {
    const response = await request(server)
      .post('/api/locker')
      .send({ name: item.name });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'You are unauthorized' });
  });

  it('should return json with status 400 if name is missing', async () => {
    const response = await request(server)
      .post('/api/locker')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        'Item name is required. Please check if it is string and provided.',
    });
  });
});

describe('GET /locker', () => {
  const item = { name: 'item' };
  // register user before running tests
  let token: string;
  beforeAll(async () => {
    await request(server)
      .post('/api/register')
      .send({ username: 'getLocker', password: 'password' });

    const response = await request(server)
      .post('/api/login')
      .send({ username: 'getLocker', password: 'password' });
    token = response.body.token;

    // create item before running tests
    await request(server)
      .post('/api/locker')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: item.name });
  });

  afterAll(async () => {
    server.close();
  });

  it('should return json with status 200 if items are returned', async () => {
    const response = await request(server)
      .get('/api/locker')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('name', item.name);
  });
});

describe('DELETE /locker/:id', () => {
  type PayloadItem = { name: string; id?: number };
  const item: PayloadItem = { name: 'item' };
  // register user before running tests
  let token: string;
  beforeAll(async () => {
    await request(server)
      .post('/api/register')
      .send({ username: 'deleteLocker', password: 'password' });

    const response = await request(server)
      .post('/api/login')
      .send({ username: 'deleteLocker', password: 'password' });
    token = response.body.token;

    // create item before running tests
    const responseItem = await request(server)
      .post('/api/locker')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: item.name });
    item.id = responseItem.body.lastID;
  });

  afterAll(async () => {
    server.close();
  });

  it('should return json with status 200 if item is deleted', async () => {
    const response = await request(server)
      .delete(`/api/locker/${item.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Item deleted successfully' });
  });

  it('should return json with status 401 if token is missing', async () => {
    const response = await request(server).delete(`/api/locker/${item.id}`);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'You are unauthorized' });
  });

  it('should return json with status 404 if item does not exist', async () => {
    const response = await request(server)
      .delete(`/api/locker/${item.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});
