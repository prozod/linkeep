import express from 'express';
import collectionController = require('../controllers/collectionController');
import { authenticateToken } from '../middlewares/authMiddleware';
import { checkJWT } from '../middlewares/checkJWT';
const router = express.Router();

// -------------------------------------
// ---------- COLLECTION QUERIES -------------

// CREATE A NEW COLLECTION
router.post('/', collectionController.CreateCollection);

// UPDATE A COLLECTION ITEMS
router.patch('/', collectionController.UpdateCollectionItems);

// QUERY USER COLLECTIONS
router.get('/', checkJWT, collectionController.GetUserCollections);

// QUERY USER COLLECTION BY ID
router.get('/:id', checkJWT, collectionController.GetUserCollectionById);

module.exports = router;
