import express from 'express';
import usersController = require('../controllers/usersController');
import { authenticateToken } from '../middlewares/authMiddleware';
const router = express.Router();

// -------------------------------------
// ---------- USER QUERIES -----------

// QUERY ALL USERS
router.get('/', usersController.QueryUsers);

// AUTHENTICATE USER
router.post('/login', usersController.AuthenticateUser);

// DE-AUTHENTICATE USER
router.get('/logout', usersController.DeauthenticateUser);

// QUERY ONE USER
router.get('/:id', authenticateToken, usersController.QueryUser);

// CREATE NEW USER
router.post('/register', usersController.CreateUser);

// DELETE EXISTING USER and all its collections
router.delete('/', usersController.DeleteUser);

module.exports = router;
