import express from "express";

class AuthMiddleware {
  constructor() {
    this.app = express();
  }
  isAuthUser(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  isNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    return next();
  }
}

export default AuthMiddleware;
