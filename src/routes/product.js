import express from 'express'

import productController from '../controllers/product'
import { isLoggedIn } from '../middlewares/auth'

const router = express.Router()

/* /products */
router.get('/', productController.getProducts)

router.get('/sort', productController.getSortedProducts)

router.get('/filter', productController.getFilteredProducts)

router.get('/:p_id', productController.getProductDetails)

router.get('/:p_id/size', productController.getProductSizes)

router.post('/:p_id/like', isLoggedIn, productController.updateLike)

router.post('/:p_id/review', isLoggedIn, productController.insertReview)

router.post('/:p_id/review/update', isLoggedIn, productController.updateReview)

router.post('/:p_id/review/delete', isLoggedIn, productController.deleteReview)

export default router
