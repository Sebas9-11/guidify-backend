"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const config = {
    connectionString: process.env.POSTGRES_URL,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
};
// const config = {
//   user: process.env.USER_DB,
//   host: process.env.HOST_DB,
//   password: process.env.PASS_DB,
//   database: process.env.NAME_DB
// }
exports.connection = new pg_1.Pool(config);
