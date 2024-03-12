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
exports.createServiceUser = exports.getServiceById = exports.createService = exports.getAllService = void 0;
const connection_1 = require("../db/connection");
const getAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT * FROM service
  `;
    const response = yield connection_1.connection.query(query);
    return response.rows;
});
exports.getAllService = getAllService;
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id } = service;
    const query = `
    INSERT INTO service (title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id)
    VALUES ('${title}', '${description}', '${date}', '${in_person}', '${virtual}', ${city_id}, ${department_id}, ${payment_id}, ${user_id})
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.createService = createService;
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT s.title, s.description, TO_CHAR(s.date, 'YYYY-MM-DD') as date, u.name as "name", u.last_name as "last_name", c.name as "city", d.name as "departament", p.name as "payment"
    FROM service s
    left join cities c on s.city_id = c.id
    left join departments d on s.department_id = d.id
    left join users u on s.user_id = u.id
    left join payment p on s.payment_id = p.id
    WHERE s.id = $1
  `;
    try {
        const response = yield connection_1.connection.query(query, [id]);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.getServiceById = getServiceById;
const createServiceUser = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id } = service;
    const query = `
    INSERT INTO service (title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id)
    VALUES ('${title}', '${description}', '${date}', '${in_person}', '${virtual}', ${city_id}, ${department_id}, ${payment_id}, ${user_id})
  `;
    try {
        const response = yield connection_1.connection.query(query);
        return response.rows;
    }
    catch (err) {
        return err;
    }
});
exports.createServiceUser = createServiceUser;
