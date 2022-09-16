import express from 'express'
import path from 'path'
import engine from 'ejs-mate'
import methodOverride from 'method-override'
import fileUpload from 'express-fileupload'
import injectAuth from './auth.js'
import injectRoutes from './routs.js'

export default function (session, authService) {
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

  //inject auth module
  injectAuth(app, session, authService)

  //inject router
  injectRoutes(app)

  return app
}
