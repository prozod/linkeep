"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
require('dotenv').config();
const PORT = process.env.PORT;
const app = (0, index_1.default)('');
app.get('/', (req, res) => {
    res.send('express app');
});
// ROUTES
const usersRoute = require('./src/routes/usersRoute');
app.use('/users', usersRoute);
const tokenRoute = require('./src/routes/tokenRoute');
app.use('/token', tokenRoute);
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});
