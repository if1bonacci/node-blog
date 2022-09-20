import passportLocal from 'passport-local'
import User from '../models/User'
import bcrypt from 'bcrypt'

export default class AuthService {
  authenticateUser = async (email: string, password: string, done: Function) => {
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
  initialize(passport) {
    const LocalStrategy = passportLocal.Strategy;
    passport.use(new LocalStrategy({usernameField: 'email'}, this.authenticateUser))
    passport.serializeUser((user, done: Function) => done(null, {
      id: user.id,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    }))
    passport.deserializeUser(async (user, done: Function) => {
      // every time call db
      // let userData = await User.findOne({id: user.id})
      return done(null, user)
    })
  }
}

