"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const cities_1 = __importDefault(require("./routes/cities"));
const deparments_1 = __importDefault(require("./routes/deparments"));
const service_1 = __importDefault(require("./routes/service"));
const token_1 = __importDefault(require("./routes/token"));
const users_1 = __importDefault(require("./routes/users"));
const token_service_1 = require("./services/token-service");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, './views')));
app.use(express_1.default.static(path_1.default.join(__dirname, './assets')));
app.use(token_service_1.validateToken);
const PORT = process.env.PORT || 3000;
const viewPath = path_1.default.join(__dirname, './views');
app.get('/', (_req, res) => {
    const htmlResponse = path_1.default.join(viewPath, 'index.html');
    res.sendFile(htmlResponse);
});
app.use('/auth', auth_1.default);
app.use('/api/token', token_1.default);
app.use('/api/users', users_1.default);
app.use('/api/services', service_1.default);
app.use('/api/cities', cities_1.default);
app.use('/api/departments', deparments_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
