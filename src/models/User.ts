import mongoose, {Schema} from 'mongoose'
import validator from 'validator'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

interface IUser {
  id: string;
  email: string;
  avatar?: string;
  password: string;
  firstName: string;
  lastName: string;
  age?: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: Array<string>;
  getFullName?: string;
}

const userSchema = new Schema<IUser>({
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
  roles: [{
    type: String,
    default: 'ROLE_USER'
  }],
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
});

//methods
userSchema.methods.getFullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
}

userSchema.methods.comparePassword = async function compare(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

// //virtual properties
// userSchema.virtual('fullName').get(function() {
//   return this.getFullName();
// })

//middlewhere
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(user.password, 12);
    user.password = hash;

    return next();
  } catch(err) {
    return // @ts-ignore
    next(err);
  }
})

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
