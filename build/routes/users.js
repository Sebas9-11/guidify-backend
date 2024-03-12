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
const user_service_1 = require("../services/user-service");
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.getAllUsers)();
    res.send(data);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const data = yield (0, user_service_1.createUser)(user);
    res.send(data);
}));
router.get('/supplier', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.getUserSupplier)();
    res.send(data);
}));
router.get('/costumer', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.getUserCostumer)();
    res.send(data);
}));
router.get('/all', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.getUserAll)();
    res.send(data);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new Error('Invalid id');
        }
        const data = yield (0, user_service_1.getUser)(id);
        res.send(data);
    }
    catch (err) {
        res.status(400).send('' + err);
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const id = parseInt(req.params.id);
    const data = yield (0, user_service_1.updateUser)(user, id);
    res.send(data);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = yield (0, user_service_1.deleteUser)(id);
    res.send(data);
}));
exports.default = router;
