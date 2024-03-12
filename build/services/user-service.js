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
exports.getUserAll = exports.getUserCostumer = exports.getUserSupplier = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const crypto_1 = __importDefault(require("crypto"));
const connection_1 = require("../db/connection");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM users
  `;
    const response = yield connection_1.connection.query(query);
    return response.rows;
});
exports.getAllUsers = getAllUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM users
    WHERE id = ${id}
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.getUser = getUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, phone, email, document, diploma, professional_card, photo, city_id, department_id, rol_id, password } = user;
    const hashedPassword = crypto_1.default.createHash('sha256').update(password).digest('base64');
    const query = `
    INSERT INTO users (name, last_name, phone, email, document, diploma, professional_card, photo, city_id, department_id, rol_id, password)
    VALUES ('${name}', '${last_name}', '${phone}', '${email}', '${document}', '${diploma}', '${professional_card}', '${photo}', ${city_id}, ${department_id}, ${rol_id}, '${hashedPassword}')
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.createUser = createUser;
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, last_name, phone, email, document, diploma, professional_card, photo, city_id, department_id, rol_id, password } = user;
    const query = `
    UPDATE users
    SET name = '${name}', last_name = '${last_name}', phone = '${phone}', email = '${email}', document = '${document}', diploma = '${diploma}', professional_card = '${professional_card}', photo = '${photo}', city_id = ${city_id}, department_id = ${department_id}, rol_id = ${rol_id}, password = '${password}'
    WHERE id = ${id}
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    DELETE FROM users
    WHERE id = ${id}
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.deleteUser = deleteUser;
const getUserSupplier = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM users
    WHERE rol_id = 1
  `;
    const response = yield connection_1.connection.query(query);
    return response.rows;
});
exports.getUserSupplier = getUserSupplier;
const getUserCostumer = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM users
    WHERE rol_id = 2
  `;
    const response = yield connection_1.connection.query(query);
    return response.rows;
});
exports.getUserCostumer = getUserCostumer;
const getUserAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM users
    WHERE rol_id = 3
  `;
    const response = yield connection_1.connection.query(query);
    return response.rows;
});
exports.getUserAll = getUserAll;
