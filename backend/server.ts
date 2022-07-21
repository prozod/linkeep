import createApp from './index';
import { Request, Response } from 'express';
require('dotenv').config();

const PORT = process.env.PORT;
const app = createApp('');

app.get('/', (req: Request, res: Response) => {
  res.send('express app');
});

// ROUTES
const usersRoute = require('./src/routes/usersRoute');
app.use('/users', usersRoute);

const tokenRoute = require('./src/routes/tokenRoute');
app.use('/token', tokenRoute);

const collectionRoute = require('./src/routes/collectionRoute');
app.use('/collection', collectionRoute);

app.listen(PORT, () => {
  console.log(`Express server listening on port: ${PORT}`);
});
