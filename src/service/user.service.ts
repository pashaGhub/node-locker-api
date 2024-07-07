import crypto from 'crypto';
import { db } from '../db/connection';
import { IUser } from '../types';

async function getUserByUsername(username: string) {
  const result = await db.get<IUser>(
    'SELECT * FROM users WHERE username = ?',
    username
  );
  return result;
}

async function registerNewUser(username: string, hashedPwd: string) {
  let uuid = crypto.randomBytes(16).toString('hex');

  const result = await db.run(
    'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
    [uuid, username, hashedPwd]
  );

  // in the controller, we return a message,
  // but here we return the response from the database
  return result;
}

export { getUserByUsername, registerNewUser };
