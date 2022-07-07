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
exports.checkExistingRefreshToken = void 0;
const tokenUtils_1 = require("../utils/tokenUtils");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const checkExistingRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies['refresh'];
    console.log(refreshToken);
    if (refreshToken == null)
        return res.sendStatus(401);
    // make db call and check if refreshtoken existss
    // console.log('checkExistingRefreshToken:', req.cookies['refreshToken']);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, data) => {
        if (err)
            return res.sendStatus(401);
        const newlyGeneratedAccessToken = (0, tokenUtils_1.generateAccessToken)({
            id: data === null || data === void 0 ? void 0 : data.id,
            name: data === null || data === void 0 ? void 0 : data.name,
            email: data === null || data === void 0 ? void 0 : data.email,
        });
        res.send({
            user: { id: data === null || data === void 0 ? void 0 : data.id, name: data === null || data === void 0 ? void 0 : data.name, email: data === null || data === void 0 ? void 0 : data.email },
            access: newlyGeneratedAccessToken,
        });
    });
});
exports.checkExistingRefreshToken = checkExistingRefreshToken;
