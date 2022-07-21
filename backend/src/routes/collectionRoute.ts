import express from 'express';
import collectionController = require('../controllers/collectionController');
import { authenticateToken } from '../middlewares/authMiddleware';
const router = express.Router();

// -------------------------------------
// ---------- COLLECTION QUERIES -------------

// CREATE A NEW COLLECTION
router.post('/', collectionController.CreateCollection);

// UPDATE A COLLECTION ITEMS
router.patch('/', collectionController.UpdateCollectionItems);

// QUERY USER COLLECTIONS
router.get('/', authenticateToken, collectionController.GetUserCollectionItems);

module.exports = router;
