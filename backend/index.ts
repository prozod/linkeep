import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { createClient } from 'redis';
const cookieParser = require('cookie-parser');

// DISCLAIMER: it always runs the .env atm because i havent set the NODE_ENV in package-json since .env.development is empty.
require('dotenv').config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV === 'development' ? './.env.development' : './.env'
  ),
});

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
  expressClient.use(
    cors({
      origin: `${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : process.env.PROD_URL
      }`,
      credentials: true,
      methods: 'GET, POST',
      allowedHeaders: 'Content-Type, Authorization, *',
    })
  );
  expressClient.use(express.urlencoded({ extended: true }));

  // db instance

  return { expressClient, redisClient };
}
