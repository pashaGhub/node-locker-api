import { db } from '../db/connection';

async function lockerItemDeleteService(id: Number) {
  const result = await db.run('DELETE FROM locker WHERE id = ?', id);

  // in the controller, we return a message,
  // but here we return the response from the database
  return result;
}

export { lockerItemDeleteService };
