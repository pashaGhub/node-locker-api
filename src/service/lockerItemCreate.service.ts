import { db } from '../db/connection';
import { ILockerItem } from '../types';

async function lockerItemCreateService(item: ILockerItem) {
  const result = await db.run(
    'INSERT INTO locker (name, user_id) VALUES (?, ?)',
    [item.name, item.user_id]
  );
  // in the controller, we return a message,
  // but here we return the response from the database
  return result;
}

export { lockerItemCreateService };
