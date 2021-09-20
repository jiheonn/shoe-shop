import express from 'express'

import brandController from '../controllers/brand'

const router = express.Router()

/* GET users listing. */
router.get('/:b_id', brandController.getBrands)

export default router
