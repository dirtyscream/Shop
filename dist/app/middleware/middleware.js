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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = exports.verifyCompany = exports.verifyUser = exports.generateTokenCompany = exports.generateTokenUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var fs = __importStar(require("fs"));
var secret_key = 'danman203';
var generateTokenUser = function (id) {
    var payload = {
        user_id: id,
        role: 'user'
    };
    var options = {
        expiresIn: '2h',
    };
    var token = jsonwebtoken_1.default.sign(payload, secret_key, options);
    return token;
};
exports.generateTokenUser = generateTokenUser;
var generateTokenCompany = function (id) {
    var payload = {
        company_id: id,
        role: 'company'
    };
    var options = {
        expiresIn: '2h',
    };
    var token = jsonwebtoken_1.default.sign(payload, secret_key, options);
    return token;
};
exports.generateTokenCompany = generateTokenCompany;
var verifyUser = function (request, response, next) {
    var token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({ error: 'No token' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secret_key);
        if (decoded.role !== 'user') {
            return response.status(403).json({ error: "Not authorized" });
        }
        request.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error:', error);
        return response.status(401).json({ error: 'error' });
    }
};
exports.verifyUser = verifyUser;
var verifyCompany = function (request, response, next) {
    var token = request.headers.authorization;
    if (!token) {
        return response.status(401).json({ error: 'No token' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secret_key);
        if (decoded.role !== 'company') {
            return response.status(403).json({ error: "Not authorized" });
        }
        request.user = decoded;
        next();
    }
    catch (error) {
        console.error('Error:', error);
        return response.status(401).json({ error: 'error' });
    }
};
exports.verifyCompany = verifyCompany;
var logging = function (request, response, next) {
    var info = "Url: ".concat(request.url, ",\n                Method: ").concat(request.method);
    fs.appendFileSync("./server.log", "".concat(info, "\n\n"));
    next();
};
exports.logging = logging;
