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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware = __importStar(require("../middleware/middleware"));
var auth = __importStar(require("../controllers/authController"));
var basket = __importStar(require("../controllers/basketController"));
var products = __importStar(require("../controllers/productController"));
var router = (0, express_1.Router)();
router.use(middleware.logging);
router.get('', auth.hello);
router.post('/api/user_register', auth.userRegister);
router.post('/api/user_login', auth.userLogin);
router.post('/api/company_register', auth.companyRegister);
router.post('/api/company_login', auth.companyLogin);
router.post('/api/add_product', middleware.verifyCompany, products.addProduct);
router.post('/api/add_to_basket', middleware.verifyUser, basket.addToBasket);
router.post('/api/add_comment', middleware.verifyUser, products.addComment);
router.post('/api/product_info', middleware.verifyUser, products.productInfo);
router.get('/api/get_basket', middleware.verifyUser, basket.getBasket);
exports.default = router;
