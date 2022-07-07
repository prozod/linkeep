"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { QueryUsers, CreateUser } = require('../controllers/users/index');
const router = express_1.default.Router();
// -------------------------------------
// ---------- USER QUERIES -----------
// QUERY ALL USERS
router.get('/all', QueryUsers);
// CREATE NEW USER
router.post('/create', CreateUser);
module.exports = router;
