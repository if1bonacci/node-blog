import express from 'express'
import path from 'path'
import engine from 'ejs-mate'
import passport from 'passport'
import fileUpload from 'express-fileupload'
import flash from 'express-flash'
import methodOverride from 'method-override'
import AuthService from './services/AuthService.js'
import cookieParser from 'cookie-parser'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'

class Server {
  constructor(port, session) {
    const __dirname = path.resolve();
    this.port = port;
    this.session = session;
    this.app = express();

    this.app.engine('ejs', engine);
    this.app.set('view engine', 'ejs');
    this.app.set('views', path.resolve(__dirname, 'views'));
    this.app.use(methodOverride('_method'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use('/uploads', express.static(path.resolve('uploads')));
    this.app.use(fileUpload());

    //inject auth module
    this.authService = new AuthService();
    this.authModule()

    //inject routes
    this.routes()
  }
  run() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    });
  }
  routes() {
    this.app.use(indexRouter);
    this.app.use(usersRouter);
    this.app.use(authRouter);
  }
  authModule() {
    this.authService.initialize(passport);
    this.app.use(flash());
    this.app.use(cookieParser());
    this.app.use(this.session)
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}

export default Server;
