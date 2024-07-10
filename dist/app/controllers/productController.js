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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productInfo = exports.addComment = exports.filterProduct = exports.findProduct = exports.addProduct = void 0;
var models = __importStar(require("../models/models"));
var fs = __importStar(require("fs"));
var addProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, product_type, price, product, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = request.body, name_1 = _a.name, description = _a.description, product_type = _a.product_type, price = _a.price;
                console.log(request.user.company_id);
                if (!name_1 ||
                    !description ||
                    !product_type || !price ||
                    typeof name_1 !== 'string' ||
                    typeof description !== 'string' ||
                    typeof product_type !== 'number') {
                    response.status(400).json({ error: "Invalid data" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models.Product.create({
                        name: name_1,
                        description: description,
                        CompanyId: request.user.company_id,
                        CategoryId: product_type,
                        price: price
                    })];
            case 1:
                product = _b.sent();
                response.status(200).json(product);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                fs.appendFileSync("./server.log", "".concat(error_1, "\n"));
                response.status(500).json({ error: error_1.message || 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addProduct = addProduct;
var findProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var name_2, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_2 = request.body.name;
                if (!name_2) {
                    response.status(400).json({ error: "Invalid data" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models.Product.findAll({
                        where: { name: name_2 },
                        raw: true
                    })];
            case 1:
                data = _a.sent();
                response.status(200).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                fs.appendFileSync("./server.log", "".concat(error_2, "\n"));
                response.status(500).json({ error: error_2.message || 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.findProduct = findProduct;
var filterProduct = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_3, filter;
    return __generator(this, function (_b) {
        try {
            _a = request.body, name_3 = _a.name, filter = _a.filter;
            if (!name_3 || !filter) {
                response.status(400).json({ error: "Invalid data" });
                return [2 /*return*/];
            }
        }
        catch (error) {
            fs.appendFileSync("./server.log", "".concat(error, "\n"));
            response.status(500).json({ error: error.message || 'Internal Server Error' });
        }
        return [2 /*return*/];
    });
}); };
exports.filterProduct = filterProduct;
var addComment = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, text, product_id, user_id, comment, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = request.body, text = _a.text, product_id = _a.product_id;
                user_id = request.user_id;
                if (!text) {
                    response.status(400).json({ error: "Invalid data" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models.Comment.create({
                        text: text,
                        ProductsId: product_id,
                        UsersId: user_id,
                    })];
            case 1:
                comment = _b.sent();
                response.status(200).json(comment);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                fs.appendFileSync("./server.log", "".concat(error_3, "\n"));
                response.status(500).json({ error: error_3.message || 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
var productInfo = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = request.query.id;
                if (!id) {
                    response.status(400).json({ error: "Invalid data" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models.Product.findAll({
                        where: {
                            id: id
                        },
                        include: models.Comment,
                        raw: true,
                    })];
            case 1:
                data = _a.sent();
                response.status(200).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                fs.appendFileSync("./server.log", "".concat(error_4, "\n"));
                response.status(500).json({ error: error_4.message || 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.productInfo = productInfo;
