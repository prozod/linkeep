import { Request, Response } from 'express';
import { og_scraper } from '../services/scrapeService';
import fetch from 'node-fetch';
import { app } from '../../server';
require('dotenv').config();

const DEF_EXP_TIME = 604000;

export const scrapeUrl = async (req: Request, res: Response) => {
  // fetch value of key (key = req.query.url), if it exists in cache.
  const value = await app.redisClient.get(`${req.query.url}`);

  if (value !== null) {
    console.log('------------------------------------');
    console.log('REDIS CACHE:', JSON.parse(value));
    console.log('------------------------------------');
    res.status(200).send(JSON.parse(value));
  } else {
    const response = await fetch(`${req.query.url}`);
    const data = await response.text();
    const og_metadata = await og_scraper(data);
    app.redisClient.setEx(
      `${req.query.url}`,
      DEF_EXP_TIME,
      JSON.stringify(og_metadata)
    );
    console.log('------------------------------------');
    console.log('SCRAPED NOW:', og_metadata);
    console.log('------------------------------------');
    res.status(200).send(og_metadata);
  }
};
