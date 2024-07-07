import { db } from '../db/connection';
import { ILockerItem } from '../types';

async function lockerItemGetByUserService(id: string) {
  const result = await db.all<ILockerItem[]>(
    'SELECT * FROM locker WHERE user_id = ?',
    id
  );

  return result;
}

export { lockerItemGetByUserService };
