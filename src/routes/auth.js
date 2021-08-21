import express from 'express'
import passport from 'passport'

const router = express.Router()

/* /auth */
router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/')
  }

  const message = req.flash('error')

  res.render('login', { message })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
)

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err

    req.logout()
    res.redirect('/')
  })
})

export default router
