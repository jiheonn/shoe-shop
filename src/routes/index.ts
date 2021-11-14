import * as express from 'express'

import indexController from '../controllers/index'

const router: express.Router = express.Router()

router.get('/', indexController.displayIndex)

export default router
