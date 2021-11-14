import * as express from 'express'

import brandController from '../controllers/brand'

const router: express.Router = express.Router()

router.get('/:id', brandController.getBrandProducts)

export default router
