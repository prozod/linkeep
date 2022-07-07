"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController = require("../controllers/usersController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// -------------------------------------
// ---------- USER QUERIES -----------
// QUERY ALL USERS
router.get('/', usersController.QueryUsers);
// AUTHENTICATE USER
router.post('/login', usersController.AuthenticateUser);
// DE-AUTHENTICATE USER
router.get('/logout', usersController.DeauthenticateUser);
// QUERY ONE USER
router.get('/:id', authMiddleware_1.authenticateToken, usersController.QueryUser);
// CREATE NEW USER
router.post('/register', usersController.CreateUser);
// DELETE EXISTING USER and all its collections
router.delete('/', usersController.DeleteUser);
module.exports = router;
