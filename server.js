import express from 'express';
import path from 'path';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import fileUpload from 'express-fileupload';

class Server {
  constructor(port) {
    const __dirname = path.resolve();
    this.port = port;
    this.app = express();

    this.app.set('views', path.resolve(__dirname, 'views'));
    this.app.set('view engine', 'twig');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.resolve(__dirname, 'public')));
    this.app.use(express.static(path.resolve(__dirname, './uploads')));
    this.app.use(fileUpload());

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
}

export default Server;
