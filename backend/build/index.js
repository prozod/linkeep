"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookieParser = require('cookie-parser');
function default_1(db) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(cookieParser());
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
    app.use(express_1.default.urlencoded({ extended: true }));
    return app;
}
exports.default = default_1;
