"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = userRegister;
exports.userLogin = userLogin;
exports.companyRegister = companyRegister;
exports.companyLogin = companyLogin;
var middleware = __importStar(require("../middleware/middleware"));
var models = __importStar(require("../models/models"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var fs = __importStar(require("fs"));
function userRegister(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, password, instanceUser, hashedPassword, savedUser, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = request.body, username = _a.username, email = _a.email, password = _a.password;
                    if (!username || !email || !password) {
                        response.status(400).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, models.User.findOne({ where: { email: email } })];
                case 1:
                    instanceUser = _b.sent();
                    if (instanceUser) {
                        response.status(400).json({ error: 'Email is used' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, models.User.create({
                            username: username,
                            email: email,
                            password: hashedPassword,
                        })];
                case 3:
                    savedUser = _b.sent();
                    response.status(201).json(savedUser);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    fs.appendFileSync('./server.log', "".concat(error_1, "\n"));
                    response.status(500).json({ error: error_1.message || 'Internal Server Error' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function userLogin(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, password, user, passwordMatch, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = request.body, username = _a.username, email = _a.email, password = _a.password;
                    if (!username || !email || !password) {
                        response.status(401).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, models.User.findOne({ where: { username: username, email: email }, raw: true })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        response.status(401).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    passwordMatch = _b.sent();
                    if (!passwordMatch) {
                        response.status(401).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    token = middleware.generateTokenUser(user.id);
                    response.status(200).json({ token: token });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    fs.appendFileSync('./server.log', "".concat(error_2, "\n"));
                    response.status(500).json({ error: error_2.message || 'Internal Server Error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function companyRegister(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, type, email, phone_number, login, password, instanceCompany, hashedPassword, savedCompany, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = request.body, name_1 = _a.name, type = _a.type, email = _a.email, phone_number = _a.phone_number, login = _a.login, password = _a.password;
                    if (!name_1 || !type || !email || !phone_number || !login || !password) {
                        response.status(400).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, models.Company.findOne({ where: { email: email } })];
                case 1:
                    instanceCompany = _b.sent();
                    if (instanceCompany) {
                        response.status(400).json({ error: 'Data is used' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, models.Company.create({
                            name: name_1,
                            type: type,
                            email: email,
                            phone_number: phone_number,
                            login: login,
                            password: hashedPassword,
                        })];
                case 3:
                    savedCompany = _b.sent();
                    response.status(201).json(savedCompany);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    fs.appendFileSync('./server.log', "".concat(error_3, "\n"));
                    response.status(500).json({ error: error_3.message || 'Internal Server Error' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function companyLogin(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, login, password, company, passwordMatch, token, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = request.body, login = _a.login, password = _a.password;
                    if (!login || !password) {
                        response.status(400).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, models.Company.findOne({ where: { login: login }, raw: true })];
                case 1:
                    company = _b.sent();
                    if (!company) {
                        response.status(401).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, company.password)];
                case 2:
                    passwordMatch = _b.sent();
                    if (!passwordMatch) {
                        response.status(401).json({ error: 'Invalid data' });
                        return [2 /*return*/];
                    }
                    token = middleware.generateTokenCompany(company.id);
                    response.status(200).json({ token: token });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    fs.appendFileSync('./server.log', "".concat(error_4, "\n"));
                    response.status(500).json({ error: error_4.message || 'Internal Server Error' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
