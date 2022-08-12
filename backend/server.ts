import createApp from './index';
import { Request, Response } from 'express';
require('dotenv').config();

const PORT = process.env.PORT;
export const app = createApp('', {
  socket: {
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASSWORD as string,
});

app.expressClient.get('/', (req: Request, res: Response) => {
  res.send('express app');
});

// ROUTES
const usersRoute = require('./src/routes/usersRoute');
app.expressClient.use('/users', usersRoute);

const tokenRoute = require('./src/routes/tokenRoute');
app.expressClient.use('/token', tokenRoute);

const collectionRoute = require('./src/routes/collectionRoute');
app.expressClient.use('/collection', collectionRoute);

const scrapeRoute = require('./src/routes/scrapeRoute');
app.expressClient.use('/scrape', scrapeRoute);

app.expressClient.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
