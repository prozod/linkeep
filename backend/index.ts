import express, { Express } from 'express';
import cors from 'cors';
const cookieParser = require('cookie-parser');

export default function (db: string) {
  const app: Express = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.urlencoded({ extended: true }));

  return app;
}
