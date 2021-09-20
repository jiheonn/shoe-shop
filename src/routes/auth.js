import express from 'express'
import passport from 'passport'

import authController from '../controllers/auth'
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth'

const router = express.Router()

/* /auth */
router.get('/login', isNotLoggedIn, authController.displayLogin)

router.post(
  '/login',
  isNotLoggedIn,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })
)

router.get('/logout', isLoggedIn, authController.logout)

export default router
