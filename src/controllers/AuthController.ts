import BaseController from './BaseController'
import User from '../models/User'
import { Request, Response, NextFunction } from 'express'

class AuthController extends BaseController {
  registerPage = (req: Request, res: Response) => {
    res.render('auth/register', {title: 'Registration', subTitle: '', bg: 'registration'})
  }

  loginPage = (req: Request, res: Response) => {
    res.render('auth/login', {title: 'Login', subTitle: '', bg: 'login'})
  }

  register = async (req: Request, res: Response) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).redirect('/user');
    } catch (err) {
      console.log(this.handlerErrors(err));
      res.redirect('/register?error=true')
    }
  }

  logout = (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect('/');
    });
  }
}

export default new AuthController();
