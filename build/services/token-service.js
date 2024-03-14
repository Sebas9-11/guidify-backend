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
exports.createToken = exports.getToken = exports.validateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const connection_1 = require("../db/connection");
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.path === '/token' || req.path === '/public' || req.path === '/') {
        return next();
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        if (!token) {
            throw new Error('Token not provided');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if ((0, moment_1.default)().unix() > payload.exp) {
            throw new Error('Token expired');
        }
        next();
    }
    catch (error) {
        res.status(401).send({ error: error.message });
    }
});
exports.validateToken = validateToken;
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM tokens
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.getToken = getToken;
const createToken = (email, pass) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = crypto_1.default.createHash('sha256').update(pass).digest('base64');
    try {
        const userQuery = `
      SELECT id, name
      FROM public.users
      WHERE email = $1 AND password = $2
    `;
        const userResult = yield connection_1.connection.query(userQuery, [email, hashedPassword]);
        if (userResult.rowCount === 0) {
            throw new Error('User not found or invalid credentials');
        }
        const userId = userResult.rows[0].id;
        const userName = userResult.rows[0].name;
        const { id: sub, name } = { id: userId, name: userName };
        const token = jsonwebtoken_1.default.sign({
            sub,
            name,
            exp: (0, moment_1.default)().add(365, 'days').unix()
        }, process.env.SECRET);
        const tokenQuery = `
      INSERT INTO tokens (token, user_id)
      VALUES ($1, $2)
    `;
        yield connection_1.connection.query(tokenQuery, [token, userId]);
        return { token };
    }
    catch (err) {
        return err;
    }
});
exports.createToken = createToken;
