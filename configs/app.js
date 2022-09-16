import express from 'express'
import path from 'path'
import engine from 'ejs-mate'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'
import injectRoutes from './routs.js'
import passport from 'passport'
import flash from 'express-flash'
import cookieParser from 'cookie-parser'

export default function (session) {
  const __dirname = path.resolve()
  const app = express()

  app.engine('ejs', engine)
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(__dirname, 'views'))
  app.use(methodOverride('_method'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use('/uploads', express.static(path.resolve('uploads')))
  app.use(fileUpload())
  app.use(flash())
  app.use(cookieParser())
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  //inject router
  injectRoutes(app)

  return app
}
