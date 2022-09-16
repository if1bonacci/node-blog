import * as dotenv from 'dotenv'
dotenv.config()

import makeSession from '../configs/session.js'
import makeSocketIo from '../configs/wss.js'
import makeApp from '../configs/app.js'

import AuthService from '../services/AuthService.js'
import mongoose from 'mongoose'

const makeServer = async () => {
  const PORT = process.env.PORT || 3000
  const WSS_PORT = process.env.WSS_PORT || 5000
  const SESSION_SECRET = process.env.SESSION_SECRET || 'session secret'
  const DB_URL = process.env.DATABASE_URL || ''
  const authService = new AuthService();
  const session = await makeSession(DB_URL, SESSION_SECRET)
  const app = makeApp(session, authService)

  await mongoose.connect(DB_URL, {
    useNewUrlParser: true
  });

  const appServer = await app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  });

  await makeSocketIo(WSS_PORT, appServer)

  return app;
}
try {
  makeServer()
} catch (err) {
  console.log(err)
}

