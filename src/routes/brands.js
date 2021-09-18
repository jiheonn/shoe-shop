import express from 'express'
import ctrl from '../controllers/brands.ctrl'

const router = express.Router()

/* GET users listing. */
router.get('/:b_id', ctrl.index)

export default router
