import express from 'express'
import ctrl from '../controllers/index.ctrl'

const router = express.Router()

/* GET home page. */
router.get('/', ctrl.index)

export default router
