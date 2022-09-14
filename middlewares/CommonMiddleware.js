class CommonMiddleware {
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

  checkRoles = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        res.status(403).redirect('/');
      }

      for (let i = 0; i < roles.length; i++) {
        if (req.user.roles.some(userRole => userRole === roles[i])) return next();
      }

      res.status(401).redirect('/?error="wrong_role"');
    }
  }
}

export default new CommonMiddleware();
