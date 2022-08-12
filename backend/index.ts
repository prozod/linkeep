import express, { Express } from 'express';
import cors from 'cors';
import { createClient } from 'redis';
const cookieParser = require('cookie-parser');

type redisUrlOptions = {
  socket: {
    host: string;
    port: number;
  };
  password: string;
};

export default function (
  db: string,
  { socket: { host, port }, password }: redisUrlOptions
) {
  // redis instance
  const redisClient = createClient({
    socket: {
      host,
      port,
    },
    password,
  });
  redisClient.connect();
  redisClient.on('connect', () => console.log('Redis connected'));
  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  // express instance
  const expressClient: Express = express();
  expressClient.use(express.json());
  expressClient.use(cookieParser());
  expressClient.use(cors({ origin: true, credentials: true }));
  expressClient.use(express.urlencoded({ extended: true }));

  // db instance

  return { expressClient, redisClient };
}
