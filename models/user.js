const mongoose = require('mongoose');

const { hashString, hashWithSalt } = require('../helpers/crypto_helper');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    default: 'customer',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    validate: {
      validator(value) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'Email is invalid.',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value);
      },
      message:
        'Password is have to be at least 8 characters with 1 lowercase, 1 uppercase, and 1 number character.',
    },
  },
  password_salt: {
    type: String,
  },
});

userSchema.pre('save', function preSave(next) {
  if (this.isNew) {
    const { salt, hash } = hashWithSalt(this.password);
    this.password_salt = salt;
    this.password = hash;
    next();
  }
});

userSchema.statics.findByEmail = function findByEmail(email) {
  return this.findOne({ email });
};

userSchema.methods.validPassword = function validPassword(inputPassword) {
  return this.password === hashString(inputPassword, this.password_salt);
};

module.exports = mongoose.model('User', userSchema);
