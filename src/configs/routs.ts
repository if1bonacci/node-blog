import indexRouter from '../routes/index'
import usersRouter from '../routes/users'
import authRouter from '../routes/auth'

export default function (app: any) {
  app.use(indexRouter);
  app.use(usersRouter);
  app.use(authRouter);

  return app;
}
