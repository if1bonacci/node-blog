import * as dotenv from 'dotenv'
dotenv.config()
import Server from '../server.js'
import MongoDB from '../configs/database.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const PORT = process.env.PORT || 3000
const SESSION_SECRET = process.env.SESSION_SECRET || 'session secret'
const DB_URL = process.env.DATABASE_URL || ''

// database
const db = new MongoDB(DB_URL)
db.connect()

// session
const sessionConnect = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: DB_URL
  })
})

// application
const app = new Server(PORT, sessionConnect)
app.run()
