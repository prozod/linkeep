"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//@QUERY ALL USERS
const QueryUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryUsers = yield prisma.user.findMany({});
    res.json({ queryUsers });
});
//@CREATE NEW USER
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.create({
        data: {
            username: 'toux',
            password: 'parola',
            email: 'hello@toux.io',
        },
    });
    console.log('User created');
    res.json({ user });
});
module.exports = { QueryUsers, CreateUser };
