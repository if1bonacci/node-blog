import { Router } from 'express'
import passport from 'passport'
import authController from '../controllers/AuthController.js'
import commonMiddleware from '../middlewares/CommonMiddleware.js'

const router = Router()

/* GET register page. */
router.get('/register', commonMiddleware.isNotAuth, authController.registerPage)

/* POST registration action */
router.post('/register', commonMiddleware.isNotAuth, authController.register)

/* GET login page. */
router.get('/login', authController.loginPage)

/* POST login action. */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
}))

/* GET logout user */
router.get('/logout', commonMiddleware.isAuthUser, authController.logout)

export default router
