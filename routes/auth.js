import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import passport from "passport";

const router = Router();
const authController = new AuthController();

const isNotAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  return next();
}

const isAuthUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/* GET register page. */
router.get('/register', isNotAuth, authController.registerPage);

/* POST registration action */
router.post('/register', isNotAuth, authController.register);

/* GET login page. */
router.get('/login', isNotAuth, authController.loginPage);

/* POST login action. */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
}));

/* DELETE logout user */
router.delete('/logout', isAuthUser, authController.logout);

export default router;
