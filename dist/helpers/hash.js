"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const env_1 = require("../config/env");
const hashPassword = async (password) => {
    return await (0, bcrypt_1.hash)(password, env_1.env.SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    return await (0, bcrypt_1.compare)(password, hashedPassword);
};
exports.verifyPassword = verifyPassword;
