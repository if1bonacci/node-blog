import indexRouter from '../routes/index.js'
import usersRouter from '../routes/users.js'
import authRouter from '../routes/auth.js'

export default function (app) {
  app.use(indexRouter);
  app.use(usersRouter);
  app.use(authRouter);

  return app;
}
