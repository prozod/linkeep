import { checkExistingRefreshToken } from '../controllers/tokenController';
import express from 'express';
const router = express.Router();

router.get('/', checkExistingRefreshToken);

module.exports = router;
