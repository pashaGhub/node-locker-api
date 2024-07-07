import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

async function connectToDb() {
  try {
    console.log('Connecting to database...');

    db = await open<sqlite3.Database, sqlite3.Statement>({
      filename:
        process.env.NODE_ENV === 'test'
          ? (process.env.TEST_DATABASE as string)
          : (process.env.DATABASE as string),
      driver: sqlite3.Database,
    });
    console.log('Successfully connected to database');
  } catch (err: Error | any) {
    console.log(err.message);
    console.log('Error connecting to database, retrying in 5 seconds');
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await connectToDb();
  }
}

export { connectToDb, db };
