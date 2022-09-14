import passportLocal from 'passport-local'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

class AuthService {
  constructor() {}
  authenticateUser = async (email, password, done) => {
    const user = await User.findOne({email: email})
    if (user == null) return done(null, false, {message: 'No user with that email!'})

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: 'Password is incorrect!'})
      }
    } catch (err) {
      console.log(err)
      return done(err)
    }
  }

  initialize = (passport) => {
    const LocalStrategy = passportLocal.Strategy;
    passport.use(new LocalStrategy({usernameField: 'email'}, this.authenticateUser))
    passport.serializeUser((user, done) => done(null, {
      id: user.id,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    }))
    passport.deserializeUser(async (user, done) => {
      // every time call db
      // let userData = await User.findOne({id: user.id})
      return done(null, user)
    })
  }
}

export default AuthService

