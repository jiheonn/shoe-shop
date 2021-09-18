import express from 'express'
import ctrl from '../controllers/products.ctrl'
import { isLoggedIn } from '../middlewares/login'

const router = express.Router()

/* /products */
router.get('/', ctrl.index)

router.get('/order', ctrl.sort)

router.get('/filter', ctrl.filter)

router.get('/:p_id', ctrl.readProductDetail)

router.get('/:p_id/size', ctrl.readProductSize)

router.post('/:p_id/like', isLoggedIn, ctrl.updateLike)

router.post('/:p_id/review', isLoggedIn, ctrl.createReview)

router.post('/:p_id/review/update', isLoggedIn, ctrl.updateReview)

router.post('/:p_id/review/delete', isLoggedIn, ctrl.deleteReview)

export default router
