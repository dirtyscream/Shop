"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var routers_1 = __importDefault(require("./app/routers/routers"));
var app = (0, express_1.default)();
var PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(express_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.use('/', routers_1.default);
app.listen(PORT, function () { return console.log("Server running on port: ".concat(PORT)); });
