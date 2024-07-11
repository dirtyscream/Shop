import { Router } from 'express'
import * as middleware from "../middleware/middleware"
import * as auth from "../controllers/authController"
import * as basket from "../controllers/basketController"
import * as products from "../controllers/productController"

const router = Router()
router.use(middleware.logging)
router.get('/', auth.hello)
router.post('/api/user_register', auth.userRegister)
router.post('/api/user_login', auth.userLogin)
router.post('/api/company_register', auth.companyRegister)
router.post('/api/company_login', auth.companyLogin)
router.post('/api/add_product', middleware.verifyCompany, products.addProduct)
router.post('/api/add_to_basket', middleware.verifyUser, basket.addToBasket)
router.post('/api/add_comment', middleware.verifyUser, products.addComment)
router.post('/api/product_info', middleware.verifyUser, products.productInfo)
router.get('/api/get_basket', middleware.verifyUser, basket.getBasket)
export default router


