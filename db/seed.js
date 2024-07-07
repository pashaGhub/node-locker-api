const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// this is a top-level await
(async () => {
  // open the database
  const db = await open({
    filename:
      process.env.NODE_ENV === 'test'
        ? './db/test-locker.db'
        : './db/locker.db',
    driver: sqlite3.Database,
  });

  //drop the tables if they exist
  await db.exec(/*sql*/ `
        DROP TABLE IF EXISTS users;
    `);

  await db.exec(/*sql*/ `
        DROP TABLE IF EXISTS locker;
    `);

  // create users table
  await db.exec(/*sql*/ `
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `);

  // create locker table
  await db.exec(/*sql*/ `
        CREATE TABLE locker (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            user_id TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

  db.close();
})();
