import BaseController from "./BaseController.js";
import User from "../models/User.js";

class AuthController extends BaseController {
  registerPage = (req, res) => {
    res.render('auth/register')
  }

  register = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).redirect('/user');
    } catch (err) {
      console.log(this.handlerErrors(err));
      res.redirect('/register?error=true')
    }
  }
}

export default AuthController;
