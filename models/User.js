import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

class User extends Schema {
  constructor() {
    super({
        email: {
          type: String,
          required: true,
          index: {unique: true},
          trim: true,
          validate: [validator.isEmail, 'email is not valid.']
        },
        avatar: {
          type: String, required: false, trim: true
        },
        password: {
          type: String,
          required: true,
          trim: true,
          length: {
            min: 6
          }
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
  }

  getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  }
  compare = async function (candidate) {
    return await bcrypt.compare(candidate, this.password);
  }

  hashPassword = async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();
    try {
      user.password = await bcrypt.hash(user.password, 12);

      return next();
    } catch(err) {
      return next(err);
    }
  }

  virtual(name, options) {
    return super.virtual('fullName', this.getFullName);
  }

  pre(method, fn) {
    super.pre('save', function (next) {
      this.updatedAt = Date.now();
      return next();
    });
    return super.pre('save', this.hashPassword);
  }
}

export default mongoose.model('User', new User)
