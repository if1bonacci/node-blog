import passportLocal from 'passport-local'
import User, { IUser } from '../models/User'
import bcrypt from 'bcrypt'

export default class AuthService {
  authenticateUser = async (email: string, password: string, done: any) => {
    const user = await User.findOne({email: email})
    if (user == null) {
      return done(null, false, {message: 'No user with that email!'})
    }

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
  initialize(passport: any) {
    const LocalStrategy = passportLocal.Strategy;
    passport.use(new LocalStrategy({usernameField: 'email'}, this.authenticateUser))
    passport.serializeUser((user: IUser, done: any) => done(null, {
      id: user.id,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    }))
    passport.deserializeUser(async (user: IUser, done: any) => {
      // every time call db
      // let userData = await User.findOne({id: user.id})
      return done(null, user)
    })
  }
}

