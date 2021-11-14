import * as express from 'express'

import productController from '../controllers/product'
import { isLoggedIn } from '../middlewares/auth'

const router: express.Router = express.Router()

router.get('/', productController.getProducts)

router.get('/search', productController.getSearchedProducts)

router.get('/:id', productController.getProductDetails)

router.get('/:id/size', productController.getProductSizes)

router.put('/:id/like', isLoggedIn, productController.updateLike)

router.post('/:id/review', isLoggedIn, productController.createReview)

router.put('/:id/review', isLoggedIn, productController.updateReview)

router.delete('/:id/review', isLoggedIn, productController.deleteReview)

export default router
