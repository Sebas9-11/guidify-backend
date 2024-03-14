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
const express_1 = __importDefault(require("express"));
const cities_service_1 = require("../services/cities-service");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cities_service_1.getCities)();
        res.send(data);
    }
    catch (err) {
        res.status(400).send('' + err);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cities_service_1.createCity)(req.body);
        res.send(data);
    }
    catch (err) {
        res.status(400).send('' + err);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cities_service_1.getCityById)(Number(req.params.id));
        res.send(data);
    }
    catch (err) {
        res.status(400).send('' + err);
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cities_service_1.updateCity)(Number(req.params.id), req.body);
        res.send(data);
    }
    catch (err) {
        res.status(400).send('' + err);
    }
}));
exports.default = router;
