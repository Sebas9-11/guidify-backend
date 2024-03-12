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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
const connection_1 = require("../db/connection");
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = crypto_1.default.createHash('sha256').update(password).digest('base64');
    const query = `
    SELECT *
    FROM users
    WHERE email = '${email}' AND password = '${hashedPassword}'
  `;
    try {
        const response = yield connection_1.connection.query(query);
        if (response.rows.length !== 0) {
            return response.rows;
        }
        return 'Invalid email or password';
    }
    catch (err) {
        return err;
    }
});
exports.login = login;
