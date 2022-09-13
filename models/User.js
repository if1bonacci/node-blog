import mongoose, { Schema } from 'mongoose';
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
        validate: [validator.isEmail, 'email is not valid']
      },
      avatar: {
        type: String,
        required: false,
        trim: true
      },
      password: {
        type: String,
        required: true,
        index: {unique: true},
        trim: true,
      },
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      age: {
        type: Number,
        required: false,
      },
      active: {
        type: Boolean,
        default: true
      },
      createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
    })
  }
  getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  }
  compare = async function(candidate) {
    return await bcrypt.compare(candidate, this.password);
  }
}

export default mongoose.model('User', new User)
