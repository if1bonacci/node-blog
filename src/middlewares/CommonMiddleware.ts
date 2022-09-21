import { Request, Response, NextFunction } from 'express'

//@todo(remove any)
class CommonMiddleware {
  isAuthUser(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

  isNotAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    return next();
  }

  checkRoles = (roles: Array<string>) => {
    return (req: any, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated()) {
        res.status(403).redirect('/');
      }

      for (let i = 0; i < roles.length; i++) {
        if (req.user.roles.some((userRole: string) => userRole === roles[i])) return next();
      }

      res.status(401).redirect('/?error="wrong_role"');
    }
  }
}

export default new CommonMiddleware();
