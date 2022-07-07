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
exports.AuthenticateUser = exports.DeauthenticateUser = exports.DeleteUser = exports.CreateUser = exports.QueryUser = exports.QueryUsers = void 0;
const usersService = require("../services/usersService");
const hashingMiddleware_1 = require("../middlewares/hashingMiddleware");
const tokenUtils_1 = require("../utils/tokenUtils");
require('dotenv').config();
//@QUERY ALL USERS
const QueryUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = usersService.GetAllUsers();
    res.json(yield query);
});
exports.QueryUsers = QueryUsers;
//@QUERY ONE USER
const QueryUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const query = usersService.GetUser(id);
    res.json(yield query);
});
exports.QueryUser = QueryUser;
//@CREATE NEW USER
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashed = yield (0, hashingMiddleware_1.hashPassword)(password);
    console.log(hashed);
    const query = usersService.CreateNewUser(email, hashed);
    res.json(yield query);
});
exports.CreateUser = CreateUser;
//@DELETE USER
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const query = usersService.DeleteUser(id);
    res.json(yield query);
});
exports.DeleteUser = DeleteUser;
//@DE-AUTHENTICATE USER
const DeauthenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('refresh');
    res.status(200).send({ message: 'User logged out successfully' });
});
exports.DeauthenticateUser = DeauthenticateUser;
//@AUTHENTICATE USER
const AuthenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const query = usersService.LoginUser(email);
    const result = yield query;
    // compare client side input password with hashed password from database
    const passwordMatch = yield (0, hashingMiddleware_1.comparePassword)(password, String(result === null || result === void 0 ? void 0 : result.password));
    if (result === null) {
        console.log("User doesn't exist in our database.");
        res.status(401).send({
            message: "User doesn't exist in our database.",
        });
    }
    else if (passwordMatch) {
        const user = { id: result === null || result === void 0 ? void 0 : result.id, name: result === null || result === void 0 ? void 0 : result.name, email: result === null || result === void 0 ? void 0 : result.email };
        const accessToken = (0, tokenUtils_1.generateAccessToken)(user);
        const refreshToken = (0, tokenUtils_1.generateRefreshToken)(user);
        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            // secure: true, //localhost is http
        });
        res
            .status(200)
            .send(Object.assign(Object.assign({}, user), { access: accessToken, refresh: refreshToken }));
    }
    else {
        console.log("There was an error fetching the user you're looking for, please make sure the credentials are correct.");
        res.status(401).send({
            message: "There was an error fetching the user you're looking for, please make sure the credentials are correct.",
        });
    }
});
exports.AuthenticateUser = AuthenticateUser;
