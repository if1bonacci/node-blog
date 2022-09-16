import session from 'express-session'
import MongoStore from 'connect-mongo'

export default function (db, secret) {
  return session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: db
    })
  })
}
