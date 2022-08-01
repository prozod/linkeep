import express from 'express';
import collectionController = require('../controllers/collectionController');
import { validateExistingJWT } from '../middlewares/jwt.guard';
const router = express.Router();

// -------------------------------------
// ---------- COLLECTION QUERIES -------------

// CREATE A NEW COLLECTION
router.post('/', validateExistingJWT, collectionController.CreateCollection);
//
// DELETE AN ITEM
router.delete(
  '/',
  validateExistingJWT,
  collectionController.DeleteCollectionItem
);

// UPDATE A COLLECTION ITEMS
router.post(
  '/item',
  validateExistingJWT,
  collectionController.CreateNewCollectionItem
);

// QUERY USER COLLECTIONS
router.get('/', validateExistingJWT, collectionController.GetUserCollections);

// QUERY USER COLLECTION BY ID
router.get(
  '/:id',
  validateExistingJWT,
  collectionController.GetUserCollectionById
);

module.exports = router;
