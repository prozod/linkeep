"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require('bcrypt');
const saltRounds = 10;
//
const hashPassword = (password) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err)
            reject(err);
        else {
            resolve(hash);
        }
    });
});
exports.hashPassword = hashPassword;
const comparePassword = (userPassword, dbPassword) => new Promise((resolve, reject) => bcrypt.compare(userPassword, dbPassword, (err, result) => {
    if (err)
        reject(err);
    else {
        resolve(result);
    }
}));
exports.comparePassword = comparePassword;
