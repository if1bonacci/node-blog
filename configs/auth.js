import passport from 'passport'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'

export default function (app, session, authService) {
  authService.initialize(passport);
  app.use(flash());
  app.use(cookieParser());
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  return app;
}
