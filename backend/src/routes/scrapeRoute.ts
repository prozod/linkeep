import express from 'express';
import { scrapeUrl } from '../controllers/scrapeController';
const router = express.Router();

router.get('/', scrapeUrl);

module.exports = router;
