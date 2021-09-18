import express from 'express'

import passport from 'passport'
import { isLoggedIn, isNotLoggedIn } from '../middlewares/login'
import ctrl from '../controllers/auth.ctrl'

const router = express.Router()

/* /auth */
router.get('/login', isNotLoggedIn, ctrl.index)

router.post(
  '/login',
  isNotLoggedIn,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
)

router.get('/logout', isLoggedIn, ctrl.logout)

export default router
