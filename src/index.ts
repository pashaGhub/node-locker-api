import 'dotenv/config';
import express from 'express';
import { connectToDb } from './db/connection';
import user from './router/user.routes';
import locker from './router/locker.routes';
import errorHandlerMiddleware from './middleware/errorHandler';
import { Server } from 'http';
const app = express();

app.use(express.json());
app.use('/api', user);
app.use('/api/locker', locker);
app.use(errorHandlerMiddleware);

connectToDb();
const server: Server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default server;
