import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class User extends Schema {
  constructor() {
    super({
        id: {
          type: String,
          immutable: true,
          index: {unique: true},
          default: uuidv4()
        },
        email: {
          type: String,
          required: true,
          index: {unique: true},
          trim: true,
          validate: [validator.isEmail, 'email is not valid.']
        },
        roles: {
          type: Array,
          required: true,
          default: ['ROLE_USER']
        },
        avatar: {
          type: String,
          required: false,
        },
        password: {
          type: String,
          required: true
        },
        firstName: {
          type: String, required: true, trim: true
        },
        lastName: {
          type: String, required: true, trim: true
        },
        age: {
          type: Number, required: false,
        },
        active: {
          type: Boolean, default: true
        },
        createdAt: {
          type: Date, immutable: true, default: () => Date.now(),
        },
        updatedAt: {
          type: Date
        }
      }
    )
      .pre('save', this.hashPassword)
      .pre('save', this.changeUpdatedAt)
      .virtual('fullName', this.getFullName)
  }

  static getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  }

  hashPassword = async function (next) {
    const user = this;
    console.log('hash password')

    if (!user.isModified('password')) return next();
    try {
      user.password = await bcrypt.hash(user.password, 12);

      return next();
    } catch (err) {
      return next(err);
    }
  }

  changeUpdatedAt = async function (next) {
    this.updatedAt = Date.now();
    return next();
  }
}

export default mongoose.model('User', new User)
