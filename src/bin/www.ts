import * as dotenv from 'dotenv'
dotenv.config()

import makeSession from '../configs/session'
import makeSocketIo from '../configs/wss'
import makeApp from '../configs/app'

import AuthService from '../services/AuthService'
import mongoose, {ConnectOptions} from 'mongoose'
import passport from 'passport'

const authService = new AuthService();

const makeServer = async (authService: AuthService) => {
  const PORT: number = parseInt(<string>process.env.PORT|| '3000')
  const WSS_PORT: number = parseInt(<string>process.env.WSS_PORT || '5000')

  const SESSION_SECRET = process.env.SESSION_SECRET || 'session secret'
  const DB_URL = process.env.DATABASE_URL || ''
  const session = await makeSession(DB_URL, SESSION_SECRET)
  const app = makeApp(session)

  await mongoose.connect(DB_URL, {
    useNewUrlParser: true
  } as ConnectOptions);

  await authService.initialize(passport);

  const appServer = await app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  });

  await makeSocketIo(WSS_PORT, appServer)

  return app;
}
try {
  makeServer(authService)
} catch (err) {
  console.log(err)
}

