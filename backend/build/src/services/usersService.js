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
exports.DeleteUser = exports.LoginUser = exports.CreateNewUser = exports.GetUser = exports.GetAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield prisma.user.findMany({});
    console.log(`All users fetched.`);
    return query;
});
exports.GetAllUsers = GetAllUsers;
const GetUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    console.log(`User ${userId} was fetched.`);
    return query;
});
exports.GetUser = GetUser;
const CreateNewUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if user exists with that email address
        const check = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        console.log(typeof check);
        if (check != null || check != undefined) {
            return `An account with '${email}' already exists in our system.`;
        }
        else {
            const query = yield prisma.user.create({
                data: {
                    name: email.split('@')[0],
                    email: email,
                    password: password,
                    // check if passwords are equa in a middleware or idk
                    confirmPassword: password,
                },
            });
            console.log(`User ${String(email.split('@')[0])} with e-mail ${String(email)} -> Password ${String(password)} was created.`);
            return query;
        }
    }
    catch (e) {
        console.log('CreateNewUserService Error', e);
    }
});
exports.CreateNewUser = CreateNewUser;
const LoginUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        console.log('Login Trycatch Service:', query); // returns null - handle it
        // compare password with db!!!!!!
        return query;
    }
    catch (e) {
        /* handle error */
        console.log('LoginUser Service Error:', e);
    }
});
exports.LoginUser = LoginUser;
// refactor to delete user collections aswell
const DeleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield prisma.user.delete({
        where: {
            id: userId,
        },
    });
    console.log(`User ${userId} got deleted.`);
    return query;
});
exports.DeleteUser = DeleteUser;
