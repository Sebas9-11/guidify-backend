"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./routes/login"));
const service_1 = __importDefault(require("./routes/service"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get('/', (_req, res) => {
    const htmlResponse = `
  <html>
    <head>
      <title>Guidify API</title>
    </head>
    <body>
      <h1>Welcome to Guidify API</h1>
        <ul>
          <li><a href="/api/login">Login</a></li>
          <li><a href="/api/users">Users</a></li>
          <li><a href="/api/services">Services</a></li>
        </ul>
    </body>
  </html>
  `;
    res.send(htmlResponse);
});
app.use('/api/login', login_1.default);
app.use('/api/users', users_1.default);
app.use('/api/services', service_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
