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
exports.updateCity = exports.createCity = exports.getCityById = exports.getCities = void 0;
const connection_1 = require("../db/connection");
const getCities = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT *
    FROM cities
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.getCities = getCities;
const getCityById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT *
    FROM cities
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
exports.getCityById = getCityById;
const createCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = city;
    const query = `
    INSERT INTO cities (name)
    VALUES ('${name}')
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.createCity = createCity;
const updateCity = (id, city) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = city;
    const query = `
    UPDATE cities
    SET name = '${name}'
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
exports.updateCity = updateCity;
