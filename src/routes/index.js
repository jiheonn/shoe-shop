import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  const username = req.user ? req.user.u_name : ''

  res.render('index', { username })
})

export default router
